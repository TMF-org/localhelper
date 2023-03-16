import Link from 'next/link';

interface Props {
  page: string;
}

export const Breadcrumbs = ({ page }: Props) => {
  return (
    <nav className="breadcrumb">
      <ol>
        <li>
          <Link href="/">Start</Link>
        </li>
        <li>
          <Link href="/">Lokalhelfer</Link>
        </li>
        <li>
          <span>{page}</span>
        </li>
      </ol>
    </nav>
  );
};
