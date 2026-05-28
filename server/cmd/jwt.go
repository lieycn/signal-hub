package cmd

import (
	"bufio"
	"crypto/rand"
	"encoding/hex"
	"fmt"
	"os"
	"path/filepath"
	"strings"

	"github.com/spf13/cobra"
)

var JWTCmd = &cobra.Command{
	Use:   "jwt",
	Short: "Generate JWT secret key",
	Run: func(cmd *cobra.Command, args []string) {
		// 生成32字节随机密钥
		secret := make([]byte, 32)
		if _, err := rand.Read(secret); err != nil {
			fmt.Printf("Error generating secret: %v\n", err)
			return
		}
		secretKey := hex.EncodeToString(secret)

		// 获取项目根目录
		cwd, err := os.Getwd()
		if err != nil {
			fmt.Printf("Error getting current directory: %v\n", err)
			return
		}

		envPath := filepath.Join(cwd, ".env")

		// 检查.env文件是否存在
		if _, err := os.Stat(envPath); os.IsNotExist(err) {
			// 创建新的.env文件
			content := fmt.Sprintf("JWT_SECRET=%s\n", secretKey)
			if err := os.WriteFile(envPath, []byte(content), 0644); err != nil {
				fmt.Printf("Error creating .env file: %v\n", err)
				return
			}
			fmt.Println("Created .env file with JWT_SECRET")
			fmt.Printf("JWT_SECRET=%s\n", secretKey)
			return
		}

		// 读取并更新.env文件
		file, err := os.Open(envPath)
		if err != nil {
			fmt.Printf("Error opening .env file: %v\n", err)
			return
		}
		defer file.Close()

		var lines []string
		found := false
		scanner := bufio.NewScanner(file)

		for scanner.Scan() {
			line := scanner.Text()
			if strings.HasPrefix(line, "JWT_SECRET=") {
				lines = append(lines, fmt.Sprintf("JWT_SECRET=%s", secretKey))
				found = true
			} else {
				lines = append(lines, line)
			}
		}

		if err := scanner.Err(); err != nil {
			fmt.Printf("Error reading .env file: %v\n", err)
			return
		}

		// 如果没有找到JWT_SECRET，添加到文件末尾
		if !found {
			lines = append(lines, fmt.Sprintf("JWT_SECRET=%s", secretKey))
		}

		// 写回文件
		content := strings.Join(lines, "\n")
		if !strings.HasSuffix(content, "\n") {
			content += "\n"
		}

		if err := os.WriteFile(envPath, []byte(content), 0644); err != nil {
			fmt.Printf("Error writing .env file: %v\n", err)
			return
		}

		if found {
			fmt.Println("Updated JWT_SECRET in .env file")
		} else {
			fmt.Println("Added JWT_SECRET to .env file")
		}
		fmt.Printf("JWT_SECRET=%s\n", secretKey)
	},
}
