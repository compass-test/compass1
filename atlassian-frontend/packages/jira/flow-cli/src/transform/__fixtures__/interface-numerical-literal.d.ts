export interface ListItemArray
  extends Array<
    Paragraph | OrderedList | BulletList | MediaSingle | CodeBlock
  > {
  0: Paragraph | MediaSingle | CodeBlock;
}
