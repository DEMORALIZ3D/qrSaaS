import {
  defaultPageLinkOptions,
  LinkData,
  PageLinkOptions,
} from "@/lib/linkPage";
import { deepMergeAndUpdate, DeepPartial } from "@/lib/utils";
import { create } from "zustand";

type UpdateLink = { id: LinkData["url"] } & Partial<LinkData>;

const useLinkPageOptions = create<{
  store: PageLinkOptions;
  ui: { hoverArea: string | null; selectedArea: string | null };
  actions: {
    setStore: (value: DeepPartial<PageLinkOptions>) => void;
    setHoverArea: (value: string | null) => void;
    setSelectedArea: (value: string | null) => void;
    addLink: (value: LinkData) => void;
    updateLink: (value: UpdateLink) => void;
    removeLink: (id: string) => void;
  };
}>((set) => ({
  store: defaultPageLinkOptions,
  ui: {
    hoverArea: null,
    selectedArea: null,
  },
  actions: {
    addLink: (value: LinkData) =>
      set((state) => {
        const array = state.store.links.data;
        array.push(value);
        return deepMergeAndUpdate(state, {
          store: {
            links: { data: array },
          },
        });
      }),
    updateLink: (value: UpdateLink) =>
      set((state) => {
        const id = value.id;
        const array = state.store.links.data;
        const index = array.findIndex((item) => item.url === id);
        array.splice(index, 1, { ...array[index], ...value });
        return {
          store: {
            ...state.store,
            links: {
              ...state.store.links,
              data: array,
            },
          },
        };
      }),
    removeLink: (id: string) =>
      set((state) => {
        const array = state.store.links.data;
        const index = array.findIndex((item) => item.url === id);
        array.splice(index, 1);
        return {
          store: {
            ...state.store,
            links: {
              ...state.store.links,
              data: array,
            },
          },
        };
      }),
    setStore: (value) =>
      set((state) => deepMergeAndUpdate(state, { store: value })),
    setHoverArea: (value) =>
      set((state) => ({
        ui: deepMergeAndUpdate(state.ui, { hoverArea: value }),
      })),
    setSelectedArea: (value) =>
      set((state) => ({
        ui: deepMergeAndUpdate(state.ui, { selectedArea: value }),
      })),
  },
}));

export default useLinkPageOptions;
