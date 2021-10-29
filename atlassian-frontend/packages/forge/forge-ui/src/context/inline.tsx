import { createContext, useContext } from 'react';
interface InlineContext {
  inline: boolean;
}

// Allow children component to render a block or inline Atlaskit component variant (e.g AKCode or AKCodeBlock)
export const InlineContext = createContext<InlineContext>({
  inline: false,
});

export const useInlineContext = () => useContext(InlineContext);
