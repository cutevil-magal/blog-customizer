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

import { useEffect, useState } from 'react';

type ArticleParamsFormProps = {
	currentState: typeof defaultArticleState;
	onSubmit: (state: typeof defaultArticleState) => void;
	onReset: () => void;
};

export const ArticleParamsForm = ({
	currentState,
	onSubmit,
	onReset,
}: ArticleParamsFormProps) => {
	const { isOpen, toggle, sidebarRef } = useDisclosure(false);

	const [state, setState] = useState(defaultArticleState); // Локальное состояние формы

	// при изменении внешнего состояния (например, после сброса)
	useEffect(() => {
		setState(currentState);
	}, [currentState]);

	// Универсальный обработчик для всех полей формы
	const handleFieldChange = (fieldName: keyof typeof state) => (value: any) => {
		setState((prevState) => ({
			...prevState,
			[fieldName]: value,
		}));
	};

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		onSubmit(state);
	};

	const handleReset = () => {
		setState(defaultArticleState);
		onReset();
	};

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={toggle} />
			<aside
				ref={sidebarRef}
				className={`${styles.container} ${
					isOpen ? styles.container_open : ''
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
							selected={state.fontFamilyOption}
							onChange={handleFieldChange('fontFamilyOption')}
							title='шрифт'
						/>
					</div>
					<div className={styles.item}>
						<RadioGroup
							name='radio'
							selected={state.fontSizeOption}
							onChange={handleFieldChange('fontSizeOption')}
							options={fontSizeOptions}
							title='Размер шрифта'
						/>
					</div>
					<div className={styles.item}>
						<Select
							options={fontColors}
							selected={state.fontColor}
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
							selected={state.backgroundColor}
							onChange={handleFieldChange('backgroundColor')}
							title='цвет фона'
						/>
					</div>
					<div className={styles.item}>
						<Select
							options={contentWidthArr}
							selected={state.contentWidth}
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
