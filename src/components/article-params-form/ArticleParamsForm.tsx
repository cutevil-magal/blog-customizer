import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { RadioGroup } from 'src/ui/radio-group';
import { Select } from 'src/ui/select';
import { Separator } from 'src/ui/separator';
import { Text } from 'src/ui/text';

import styles from './ArticleParamsForm.module.scss';

import { useDisclosure } from 'src/hooks/useDisclosure';
import {
	fontFamilyOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	fontSizeOptions,
	defaultArticleState,
} from 'src/constants/articleProps';

import { useState } from 'react';

type ArticleParamsFormProps = {
	articleState: typeof defaultArticleState;
	setArticleState: (state: typeof defaultArticleState) => void;
};

export const ArticleParamsForm = ({
	articleState, // состояние формы  из App
	setArticleState,
}: ArticleParamsFormProps) => {
	const { isFormOpen, toggleForm, sidebarRef } = useDisclosure(false);

	const [currentArticleState, setCurrentArticleState] = useState(articleState); // Локальное состояние формы

	// Универсальный обработчик для всех полей формы
	const handleFieldChange =
		(fieldName: keyof typeof currentArticleState) => (value: object) => {
			setCurrentArticleState((prevState) => ({
				...prevState,
				[fieldName]: value,
			}));
		};
	const handleReset = () => {
		setCurrentArticleState(defaultArticleState);
		setArticleState(defaultArticleState);
	};

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setArticleState(currentArticleState);
	};

	return (
		<>
			<ArrowButton isOpen={isFormOpen} onClick={toggleForm} />
			<aside
				ref={sidebarRef}
				className={`${styles.container} ${
					isFormOpen ? styles.container_open : ''
				}`}>
				<form
					className={styles.form}
					onSubmit={handleSubmit}
					onReset={handleReset}>
					<Text as='h1' size={31} weight={800} uppercase>
						Задайте параметры
					</Text>
					<div className={styles.item}>
						<Select
							options={fontFamilyOptions}
							selected={currentArticleState.fontFamilyOption}
							onChange={handleFieldChange('fontFamilyOption')}
							title='шрифт'
						/>
					</div>
					<div className={styles.item}>
						<RadioGroup
							name='radio'
							selected={currentArticleState.fontSizeOption}
							onChange={handleFieldChange('fontSizeOption')}
							options={fontSizeOptions}
							title='Размер шрифта'
						/>
					</div>
					<div className={styles.item}>
						<Select
							options={fontColors}
							selected={currentArticleState.fontColor}
							onChange={handleFieldChange('fontColor')}
							title='цвет шрифта'
						/>
					</div>
					<div className={styles.item}>
						<Separator />
					</div>
					<div className={styles.item}>
						<Select
							options={backgroundColors}
							selected={currentArticleState.backgroundColor}
							onChange={handleFieldChange('backgroundColor')}
							title='цвет фона'
						/>
					</div>
					<div className={styles.item}>
						<Select
							options={contentWidthArr}
							selected={currentArticleState.contentWidth}
							onChange={handleFieldChange('contentWidth')}
							title='ширина контента'
						/>
					</div>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
