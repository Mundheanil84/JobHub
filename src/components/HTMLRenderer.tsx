type Props = {
  content: string;
};

const HTMLRenderer = ({ content }: Props) => {
  return <div dangerouslySetInnerHTML={{ __html: content }} />;
};

export default HTMLRenderer;
