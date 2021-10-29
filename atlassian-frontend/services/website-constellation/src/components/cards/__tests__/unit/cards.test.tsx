import React from 'react';
import { render, cleanup, RenderResult } from '@testing-library/react';
import ImageCard from '../../image-card';

type TestConfig = {
  title: string;
  description: string;
  card: RenderResult;
};

describe('ImageCard', () => {
  describe('Basic', () => {
    const config: TestConfig = {
      title: 'test',
      description: 'description',
      card: null,
    };

    beforeEach(() => {
      config.card = render(
        <ImageCard
          title={config.title}
          description={config.description}
          to="/"
        />,
      );
    });

    afterEach(cleanup);

    it('should render the card with the correct title', async () => {
      const h2 = await config.card.findByText(config.title);

      expect(h2.tagName).toEqual('H2');
    });

    it('renders the correct copy', async () => {
      const p = await config.card.findByText(config.description);

      expect(p.tagName).toEqual('P');
    });
  });

  describe('Truncates', () => {
    const config: TestConfig = {
      title: 'test',
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo nihil, aut beatae similique est, unde mollitia suscipit dolore vel placeat adipisci! Cumque quae animi nisi, aliquid eveniet soluta facilis reiciendis. Impedit laboriosam temporibus omnis recusandae perferendis assumenda, earum voluptas ipsum sint reiciendis delectus quidem nemo, dolorum ipsam quasi ad quo quis exercitationem minima in quos facilis. Fuga, in? Porro quis non consectetur quam ut ea velit reiciendis harum ab at sed nulla tenetur dolor, perferendis dicta molestiae corrupti veritatis temporibus maiores sit rem doloribus numquam! Quisquam sit optio perferendis harum animi, recusandae deserunt reiciendis a nesciunt doloremque numquam enim fugit ducimus. Placeat beatae libero magni, culpa aliquam veritatis cupiditate suscipit rem quas impedit tenetur necessitatibus commodi molestias doloremque in minus autem iusto dolorum quos eaque. Minima, nemo quae? Excepturi, nam!',
      card: null,
    };
    beforeEach(() => {
      config.card = render(
        <ImageCard
          title={config.title}
          description={config.description}
          to="/"
        />,
      );
    });

    afterEach(cleanup);

    it('should render the card with the correct title', async () => {
      const h2 = await config.card.findByText(config.title);

      expect(h2.tagName).toEqual('H2');
    });

    it('renders copy with ellipses', async () => {
      const p = await config.card.findByText(/\.\.\./);

      expect(p.tagName).toEqual('P');
      expect(
        p.textContent.includes(config.description.slice(0, 100)),
      ).toBeTruthy();
    });
  });
});
