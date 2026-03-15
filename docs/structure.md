# Project Structure Rules

## Общая структура `src/`

Проект организован по своей собственной структуре.

## Папки и их назначение

### `src/assets/`

- **`fonts/`** - файлы шрифтов (.ttf, .otf)
- **`images/`** - изображения, иконки, статические ресурсы
- Используй осмысленные имена файлов: `logo-primary.png`, `icon-user.svg`

### `src/components/`

- Переиспользуемые UI компоненты (могут содержать модели из "бизнес логики")
- **`ui-kits/`** - системные UI компоненты (Button, Input, Switch и т.д.), не содержат моделей из бизнес логики
- Компоненты группируются по функциональности в подпапки если их много
- Если компонент сложный и содержит внутри много логики, то может быть вынесен в отдельную папку и декомпозирован на
  файлы (компонент + утилиты + константы + типы)
- Пример: `components/Button/Button.tsx`, `components/Button/button-consts.ts`, `components/Button/button-utils.ts`,
  `components/Button/button-types.ts`, `components/Button/button-hooks.ts`

### `src/constants/`

- Глобальные константы приложения не относящиеся к функционалу конкретного экрана или сущности, а имеющие отношение к
  приложению в целом или полезным ресурсам
- `platform-consts.ts` - все что относится к определению платформы и версий
- `permissions-consts` - все константы, что связаны с разрешениями на устройствах (доступ к файлам и тд)
- `dropdown-options` - все константы nameOptions для Dropdown инпутов в приложении

### `src/hooks/`

- Кастомные React хуки
- Именование: `use` + название (`useAuth.ts`, `useWorkout.ts`)
- Один хук = один файл
- Хуки для глобальных событий как таймер или пуши, но не для бизнес-логики (бизнес-логика внутри родительских экранов)

### `src/navigation/`

- Конфигурация навигации (React Navigation)
- Каждый стек или таб-навигатор оформляется в отдельную папку внутри `src/navigation/`
- Папка содержит файл навигатора `NameStack.tsx` / `NameTabs.tsx` и файл типов `name-stack-types.ts` /
  `name-tabs-types.ts`
- Файл типов содержит: `ParamList` (параметры маршрутов), `NavigationScreenProps` (пропсы экрана с `navigation` и
  `route`), `NavigationHookProps` (только `navigation` для хуков и дочерних компонентов)
- Пример структуры:
  ```
  navigation/
    onboarding-stack/
      OnboardingStack.tsx
      pin-code-stack-types.ts
    main-tabs/
      MainTabs.tsx
      main-tabs-types.ts
  ```

### `src/providers/`

- React Context провайдеры
- Глобальные провайдеры состояния, темы, аутентификации
- Один провайдер = один файл или папка если сложный

### `src/screens/`

- Экраны приложения (страницы)
- Группируй по фичам/доменам: `auth/`, `workout/`, `profile/`
- Каждый экран в своей папке если содержит несколько файлов
- Если экрану нужны локальные компоненты (используемые только внутри этого экрана), они размещаются в папке
  `components/` на уровне экрана
- Аналогично для утилит, констант и типов, специфичных для экрана — они размещаются в соответствующих файлах на уровне
  папки экрана
- Пример структуры экрана:
  ```
  screens/
    splash/
      SplashScreen.tsx
      components/
        PulseCircle.tsx
      splash-consts.ts
  ```
- Пример: `screens/auth/LoginScreen.tsx`, `screens/workout/WorkoutListScreen.tsx`

### `src/server/`

- Backend логика, если используется локальный сервер
- **`service/`** - сервисные классы для бизнес-логики
- **`typeorm/`** - TypeORM конфигурация и модели
  - **`database/`** - конфигурация БД, миграции
  - **`models/`** - TypeORM entity модели
- Используй для серверной части если приложение включает локальный backend

### `src/utils/`

- Утилитарные функции
- Хелперы, форматирование, валидация, трансформации данных
- Группируй по функциональности: `date-utils.ts`, `validation-utils.ts`, `common-utils.ts`
- Функции должны быть pure где возможно

## Правила организации файлов

### Именование файлов

- Компоненты: `ComponentName.tsx`
- Хуки: `useHookName.ts`
- Хуки: `useHookName.ts` для глобальных (в `src/hooks/`), `name-hooks.ts` если специфичны для компонента
- Утилиты: `name-utils.ts` или `component-name-utils.ts` если специфичны для компонента
- Типы: `name-types.ts` или `component-name-types.ts` если специфичны для компонента
- Константы: `name-consts.ts` или `component-name-consts.ts` если специфичны для компонента

### Структура компонента

Если компонент сложный и содержит несколько файлов:

```
components/
  UserCard/
    UserCard.tsx
    user-card-utils.ts
    user-card-consts.ts
    user-card-types.ts
    user-card-hooks.ts
```

Для простых компонентов - один файл:

```
components/
  Button.tsx
```

### Импорты

- Используй относительные импорты от `src/` или абсолютные если настроены алиасы (согласно babel конфигу)
- Пример: `import { Button } from '../components/Button'` или `import { Button } from '@components/Button'`
- Избегай глубокой вложенности импортов (`../../../../`) - для этого есть алиасы (согласно babel конфигу)

## Запрещенные практики

- Не создавай index файлы
- Не создавай файлы в корне `src/`, все должно быть в соответствующих папках
- Не дублируй код, выноси общее в утилиты или компоненты
