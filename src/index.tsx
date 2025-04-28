import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useState } from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import { defaultArticleState } from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
	const [articleState, setArticleState] = useState(defaultArticleState); // Главное состояние приложения

	const appStyles = (state = articleState) => {
		// Динамические стили на основе состояния
		return {
			'--font-family': state.fontFamilyOption.value,
			'--font-size': state.fontSizeOption.value,
			'--font-color': state.fontColor.value,
			'--container-width': state.contentWidth.value,
			'--bg-color': state.backgroundColor.value,
		} as CSSProperties;
	};

	const handleStateChange = (newState: typeof defaultArticleState) => {
		setArticleState(newState); // Обновляем главное состояние
	};

	const handleReset = () => {
		setArticleState(defaultArticleState); // Сбрасываем к оригиналу
	};

	return (
		<main
			className={clsx(styles.main)}
			// style={
			// 	{
			// 		'--font-family': defaultArticleState.fontFamilyOption.value,
			// 		'--font-size': defaultArticleState.fontSizeOption.value,
			// 		'--font-color': defaultArticleState.fontColor.value,
			// 		'--container-width': defaultArticleState.contentWidth.value,
			// 		'--bg-color': defaultArticleState.backgroundColor.value,
			// 	} as CSSProperties
			// }>
			// <ArticleParamsForm />
			style={appStyles()}>
			<ArticleParamsForm
				currentState={articleState}
				onSubmit={handleStateChange}
				onReset={handleReset}
			/>
			<Article />
		</main>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
