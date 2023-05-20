import type { TextProps } from '@chakra-ui/react';
import { Text } from '@chakra-ui/react';

const BionifiedWord = ({
  children: word,
}: Pick<BionifiedParagraphProps, 'children'>) => {
  if (!word) {
    return null;
  }

  const { length } = word;

  if (length === 1) {
    return <> {word}</>;
  }

  const boldedCharNum = Math.ceil(0.4 * length);

  return (
    <>
      {' '}
      <b>{word?.slice(0, boldedCharNum)}</b>
      <span>{word?.slice(boldedCharNum)}</span>
    </>
  );
};

type BionifiedParagraphProps = {
  children?: string;
} & TextProps;

export const BionifiedParagraph = ({
  children,
  ...props
}: BionifiedParagraphProps) => {
  return (
    <Text {...props}>
      {children?.split(' ').map((word, idx) => (
        // eslint-disable-next-line react/no-array-index-key
        <BionifiedWord key={`${word}-${idx}`}>{word}</BionifiedWord>
      ))}
    </Text>
  );
};
