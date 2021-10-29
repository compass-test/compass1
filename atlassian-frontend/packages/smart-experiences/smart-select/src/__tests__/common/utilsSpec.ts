import { GroupedOptionsType, OptionType } from '@atlaskit/select/types';

import { toGroupedOptionsMapperFactory } from '../../common/utils';

const optionsCreator = (numOptions: number, offset?: number): OptionType[] =>
  Array.from(Array(numOptions).keys()).map((key) => ({
    label: `${key + (offset ?? 0)}`,
    value: `${key + (offset ?? 0)}`,
  }));

const assertGroupedOptions = (
  groupedOptions: GroupedOptionsType<any>,
  mappedOptions: GroupedOptionsType<any>,
) => {
  mappedOptions.forEach((mappedOption, idx) => {
    // assert groups maintain the same order
    expect(mappedOption.label).toEqual(groupedOptions[idx].label);
    // check reversal order
    const reversedOptions = (groupedOptions[idx]
      .options as OptionType[]).reverse();
    expect(mappedOption.options).toEqual(reversedOptions);
  });
};

describe('toGroupedOptionsMapperFactory', () => {
  it('should create mapper that directly return reranked options if input options are not grouped', () => {
    const opts = optionsCreator(10);
    const rerankedOpts = opts.reverse();

    const mapper = toGroupedOptionsMapperFactory(opts);
    const mappedOpts = mapper(rerankedOpts);

    expect(mappedOpts.length).toEqual(rerankedOpts.length);
    rerankedOpts.forEach((opt, i) => {
      expect(opt).toEqual(mappedOpts[i]);
    });
  }),
    describe('grouped', () => {
      it('should follow rerank order for single grouped options', () => {
        const opts = optionsCreator(10);
        const groupedOpt = [{ label: 'group1', options: opts }];
        const rerankedOpts = opts.reverse();

        const mapper = toGroupedOptionsMapperFactory(groupedOpt);
        const mappedOpts = mapper(rerankedOpts);

        // Assert
        expect(mappedOpts[0].options.length).toEqual(rerankedOpts.length);
        rerankedOpts.forEach((opt, i) => {
          expect(opt).toEqual(mappedOpts[0].options[i]);
        });
      }),
        it('should maintain grouped options ordering when there are no duplications', () => {
          const g1Count = 4;
          const g2Count = 2;
          const g1Opts = optionsCreator(g1Count);
          const g2Opts = optionsCreator(g2Count, 4);
          const groupedOptions = [
            { label: 'group1', options: g1Opts },
            { label: 'group2', options: g2Opts },
          ];
          const rerankedOpts = optionsCreator(g1Count + g2Count).reverse();

          const mapper = toGroupedOptionsMapperFactory(groupedOptions);
          const mappedOptions = mapper(rerankedOpts);

          // Assert
          assertGroupedOptions(
            groupedOptions,
            mappedOptions as GroupedOptionsType<any>,
          );
        });
      it('should maintain duplicated items and rank them when there are duplicates in the grouped options', () => {
        const g1Opts = optionsCreator(4);
        const g2Opts = optionsCreator(2, 4);
        const groupedOptions = [
          { label: 'group1', options: g1Opts },
          { label: 'group2', options: g2Opts },
        ];
        const rerankedOpts = optionsCreator(
          g1Opts.length + g2Opts.length,
        ).reverse();

        const mapper = toGroupedOptionsMapperFactory(groupedOptions);
        const mappedOptions = mapper(rerankedOpts);

        // Assert
        assertGroupedOptions(
          groupedOptions,
          mappedOptions as GroupedOptionsType<any>,
        );
      });
    });
});
