// Спільні значення для SSR-prefetch та клієнтського useQuery.
// Ключ запиту на сервері й на клієнті мусить збігатися, інакше гідратація
// кешу «промахнеться» і браузер зробить зайвий мережевий запит.
export const PER_PAGE = 12;
export const INITIAL_PAGE = 1;
export const INITIAL_SEARCH = '';
