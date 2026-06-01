#!/bin/bash

# signal-hub release script
# Usage: ./release.sh [version] [create_release]
#   version: version tag (e.g., v1.0.0)
#   create_release: "yes" to create GitHub release (default: no)

set -e

# Color output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if gh CLI is installed for release creation
check_gh_cli() {
    if ! command -v gh &> /dev/null; then
        echo -e "${YELLOW}Warning: GitHub CLI (gh) not found. Release creation will be skipped.${NC}"
        return 1
    fi
    return 0
}

# Check version format
check_version_format() {
    local version=$1
    if [[ ! $version =~ ^v[0-9]+\.[0-9]+\.[0-9]+$ ]]; then
        echo -e "${RED}Error: Version must follow semver format (e.g., v1.0.0)${NC}"
        exit 1
    fi
}

# Build frontend
build_frontend() {
    echo -e "${GREEN}Building frontend...${NC}"
    cd frontend
    pnpm install
    pnpm build
    cd ..
    echo -e "${GREEN}Frontend build complete!${NC}"
}

# Build server binary for different platforms
build_server() {
    echo -e "${GREEN}Building server binaries...${NC}"
    cd server

    # Create build directory
    mkdir -p ../build

    # Supported platforms
    platforms=("linux/amd64" "linux/arm64" "darwin/amd64" "darwin/arm64" "windows/amd64")

    for platform in "${platforms[@]}"; do
        platform_split=(${platform//\// })
        GOOS=${platform_split[0]}
        GOARCH=${platform_split[1]}

        output_name="signal-hub-$GOOS-$GOARCH"
        if [ $GOOS = "windows" ]; then
            output_name+='.exe'
        fi

        echo -e "${YELLOW}Building for $GOOS/$GOARCH...${NC}"
        env CGO_ENABLED=0 GOOS=$GOOS GOARCH=$GOARCH go build \
            -trimpath \
            -ldflags="-s -w -buildid=" \
            -o "../build/$output_name" \
            .

        if [ $? -ne 0 ]; then
            echo -e "${RED}Build failed for $GOOS/$GOARCH${NC}"
            exit 1
        fi
    done

    cd ..
    echo -e "${GREEN}Server builds complete!${NC}"
}

# Create checksums for binaries
create_checksums() {
    echo -e "${GREEN}Creating checksums...${NC}"
    cd build
    sha256sum * > checksums.txt
    cd ..
    echo -e "${GREEN}Checksums created!${NC}"
}

# Push to GitHub
push_to_github() {
    local version=$1

    echo -e "${GREEN}Pushing to GitHub...${NC}"

    # Check if remote exists
    if ! git remote get-url origin &> /dev/null; then
        echo -e "${YELLOW}No git remote 'origin' found. Adding...${NC}"
        git remote add origin git@github.com:lieycn/signal-hub.git
    fi

    # Push commits and tag
    git push origin main
    git push origin "$version"

    echo -e "${GREEN}Pushed to GitHub!${NC}"
}

# Create GitHub release
create_github_release() {
    local version=$1

    if ! check_gh_cli; then
        return 1
    fi

    echo -e "${GREEN}Creating GitHub release...${NC}"

    # Create release with binaries
    gh release create "$version" \
        --title "signal-hub $version" \
        --notes "Release $version" \
        build/*

    echo -e "${GREEN}GitHub release created!${NC}"
}

# Clean build artifacts
clean_build() {
    echo -e "${GREEN}Cleaning build artifacts...${NC}"
    rm -rf build
    echo -e "${GREEN}Clean complete!${NC}"
}

# Main execution
main() {
    local version=$1
    local create_release=${2:-no}

    # Check version
    if [ -z "$version" ]; then
        echo -e "${RED}Error: Version required (e.g., ./release.sh v1.0.0)${NC}"
        exit 1
    fi

    check_version_format "$version"

    echo -e "${GREEN}======================================${NC}"
    echo -e "${GREEN}signal-hub Release Script${NC}"
    echo -e "${GREEN}======================================${NC}"
    echo -e "${GREEN}Version: $version${NC}"
    echo -e "${GREEN}Create Release: $create_release${NC}"
    echo -e "${GREEN}======================================${NC}"

    # Check for uncommitted changes
    if ! git diff --quiet || ! git diff --cached --quiet; then
        echo -e "${YELLOW}Warning: You have uncommitted changes${NC}"
        read -p "Continue anyway? (y/n) " -n 1 -r
        echo
        if [[ ! $REPLY =~ ^[Yy]$ ]]; then
            exit 1
        fi
    fi

    # Create git tag if not exists
    if ! git rev-parse "$version" &> /dev/null; then
        echo -e "${YELLOW}Creating git tag $version...${NC}"
        git tag -a "$version" -m "Release $version"
    else
        echo -e "${YELLOW}Tag $version already exists${NC}"
    fi

    # Build everything
    build_frontend
    build_server
    create_checksums

    # Push to GitHub
    push_to_github "$version"

    # Create release if requested
    if [ "$create_release" = "yes" ]; then
        create_github_release "$version"
    else
        echo -e "${YELLOW}Skipping release creation. Run with 'yes' to create release.${NC}"
    fi

    echo -e "${GREEN}======================================${NC}"
    echo -e "${GREEN}Release $version complete!${NC}"
    echo -e "${GREEN}======================================${NC}"
    echo -e "${GREEN}Binaries available in ./build/${NC}"
}

# Run main function
main "$@"
