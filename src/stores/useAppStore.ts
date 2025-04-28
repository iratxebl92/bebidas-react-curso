import {create} from 'zustand';
import { devtools } from 'zustand/middleware';
import { createRecipesSlice, RecipesSliceType} from './recipeSlice';
import { FavoritesSliceType, createFavoritesSlice } from './favoritesSlice';
import { createNotificationSlice, NotificationSliceType } from './notificationSlice';
import { AISlice, createAISlice } from './aiSlice';

export const useAppStore = create<RecipesSliceType & FavoritesSliceType & NotificationSliceType & AISlice>()(devtools((...a) => ({
    ...createRecipesSlice(...a), //... para que coja una copia
    ...createFavoritesSlice(...a),
    ...createNotificationSlice(...a),
    ...createAISlice(...a),
})))


/*
...a toma una copia de todos los argumentos (set, get, api)
*/