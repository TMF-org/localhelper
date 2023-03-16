export const getMarkdownContent = async (name: string) => {
  const fs = await import('fs/promises');
  const { join } = await import('path');

  const markdown = await fs.readFile(
    join(process.cwd(), `./src/content/${name}.md`),
  );
  return markdown.toString();
};
