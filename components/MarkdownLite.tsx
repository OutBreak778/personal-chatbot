import Link from "next/link";
import React from "react";

interface MarkdownLiteProps {
  text: string;
}

const MarkdownLite: React.FC<MarkdownLiteProps> = ({ text }) => {
  const linkRegex = /\[(.+?)\]\((.+?)\)/g;
  const parts = [];

  let last = 0;
  let cnt;
  while ((cnt = linkRegex.exec(text)) !== null) {
    const [fullMatch, linkMatch, linkURL] = cnt;
    const cntStart = cnt.index;
    const cntEnd = cntStart + fullMatch.length;

    if (last < cntStart) {
      parts.push(text.slice(last, cntStart));
    }

    parts.push(
      <Link
        href={linkURL}
        target="_blank"
        rel="noopener noreferrer"
        className="break-words underline underline-offset-2 text-blue"
        key={linkURL}
      >
        {linkMatch}
      </Link>
    );

    last = cntEnd
  }

  if(last < text.length) {
    parts.push(text.slice(last))
  }

  return <>
    {parts.map((part, index) => (
        <React.Fragment key={index}>
            {part}
        </React.Fragment>
    ))}
  </>;
};

export default MarkdownLite;
