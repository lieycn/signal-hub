package services

import (
	"net/url"
	"strings"

	"github.com/PuerkitoBio/goquery"
)

func CompleteRelativeURLs(htmlStr, base string) (string, error) {
	baseURL, err := url.Parse(base)
	if err != nil {
		return "", err
	}

	doc, err := goquery.NewDocumentFromReader(strings.NewReader(htmlStr))
	if err != nil {
		return "", err
	}

	attrs := map[string]string{
		"a":      "href",
		"link":   "href",
		"script": "src",
		"img":    "src",
		"iframe": "src",
		"source": "src",
		"video":  "src",
		"audio":  "src",
	}

	for tag, attr := range attrs {
		doc.Find(tag).Each(func(i int, s *goquery.Selection) {
			val, exists := s.Attr(attr)
			if !exists || val == "" {
				return
			}

			// 跳过特殊协议
			if strings.HasPrefix(val, "javascript:") ||
				strings.HasPrefix(val, "data:") ||
				strings.HasPrefix(val, "mailto:") ||
				strings.HasPrefix(val, "#") {
				return
			}

			u, err := url.Parse(val)
			if err != nil {
				return
			}

			abs := baseURL.ResolveReference(u)
			s.SetAttr(attr, abs.String())
		})
	}

	result, err := doc.Html()
	if err != nil {
		return "", err
	}

	return result, nil
}
