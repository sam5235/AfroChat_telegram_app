import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { a11yDark } from "react-syntax-highlighter/dist/cjs/styles/prism";
import remarkBreaks from "remark-breaks"; 
import useTelegramTheme from "../utils/useTelegramTheme";

interface MarkdownProps {
  content: string;
}

const MarkdownText = ({ content }: MarkdownProps) => {
const isDarkMode = useTelegramTheme();
  return (
    <div className="w-full prose-base ">
      <ReactMarkdown
        children={content}
        remarkPlugins={[remarkGfm, remarkBreaks]}
        components={{
          code({ node, inline, className, children, ...props }: any) {
            const match = /language-(\w+)/.exec(className || "");
            return !inline && match ? (
              <SyntaxHighlighter
              style={a11yDark}
              language={match[1]}
              showLineNumbers
              wrapLines
              lineProps={{
                style: {
                wordBreak: "break-all",
                whiteSpace: "pre-wrap",
                },
              }}
              customStyle={{
                backgroundColor: "#282c34",
                color: "#abb2bf",
                fontSize: "14px",
                fontFamily:
                'Menlo, Monaco, Consolas, "Courier New", monospace',
                padding: "1rem",
                borderRadius: "4px",
                overflow: "auto",
              }}
              {...props}
              >
              {String(children).replace(/\n$/, "")}
              </SyntaxHighlighter>
            ) : (
              <code className={`className text-sm`} {...props}>
              {children}
              </code>
            );
          },
          a({ node, ...props }: any) {
            return (
              <a
                style={{
                  color: "blue",
                  opacity: "0.8",
                  fontWeight: "normal",
                  fontSize: "16px",
                }}
                {...props}
              />
            );
          },
        }}
      />
      <style>{`
        .prose {
          color: ${ !isDarkMode ? "#0f172a" : "#F1F3FB"};
        }
        .prose h1,
        .prose h2,
        .prose h3,
        .prose h4,
        .prose h5,
        .prose h6,
        .prose p,
        .prose ul,
        .prose ol,
        .prose li,
        .prose strong,
        .prose em,
        .prose blockquote,
        .prose pre {
          color: inherit;
        }
      `}</style>
    </div>
  );
};

export default MarkdownText;
