import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useCartStore = create(
  persist(
    (set) => ({
      cart: [],

      // Tilføj et produkt til kurven
      addToCart: (product) =>
        set((state) => {
          const exists = state.cart.find(
            (item) => item.id === product.id
          );

          if (exists) {
            return {
              cart: state.cart.map((item) =>
                item.id === product.id
                  ? { ...item, quantity: item.quantity + 1 }
                  : item
              ),
            };
          }

          return {
            cart: [
              ...state.cart,
              {
                id: product.id,
                title: product.title,
                price: product.price,
                thumbnail: product.thumbnail,
                quantity: 1,
              },
            ],
          };
        }),

      // Fjern et produkt fra kurven
      removeFromCart: (productId) =>
        set((state) => ({
          cart: state.cart.filter(
            (item) => item.id !== productId
          ),
        })),

      // Ændr antal
      updateQuantity: (productId, quantity) =>
        set((state) => ({
          cart: state.cart.map((item) =>
            item.id === productId
              ? { ...item, quantity }
              : item
          ),
        })),

      // Tøm kurven
      clearCart: () => set({ cart: [] }),
    }),
    {
      name: "webshop-cart",
      merge: (persistedState, currentState) => ({
        ...currentState,
        ...(persistedState && typeof persistedState === "object"
          ? persistedState
          : {}),
        cart: Array.isArray(persistedState?.cart)
          ? persistedState.cart
          : [],
      })
    }
  )
);


