import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';

import styles from './ArticleParamsForm.module.scss';
import { Text } from 'src/ui/text';
import clsx from 'clsx';
import { Select } from 'src/ui/select';
import {
	ArticleStateType,
	backgroundColors,
	contentWidthArr,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
	OptionType,
} from 'src/constants/articleProps';
import React from 'react';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';

interface ArticleParamsFormProps {
	isOpen: boolean;
	onToggle: () => void;
	articleState: ArticleStateType;
	setArticleState: React.Dispatch<React.SetStateAction<ArticleStateType>>;
	handleApply: () => void;
	handleReset: () => void;
}

export const ArticleParamsForm = ({
	isOpen,
	onToggle,
	articleState,
	setArticleState,
	handleReset,
	handleApply,
}: ArticleParamsFormProps) => {
	const handleChange =
		(fieldName: keyof ArticleStateType) => (value: OptionType) => {
			setArticleState((prev: ArticleStateType) => ({
				...prev,
				[fieldName]: value,
			}));
		};

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={onToggle} />
			{isOpen && (
				<aside
					className={clsx(styles.container, {
						[styles.container_open]: isOpen,
					})}>
					<form
						className={styles.form}
						onClick={(event) => event.preventDefault()}>
						<Text size={31} weight={800} as='h3' uppercase align='center'>
							Задайте параметры
						</Text>
						<Select
							selected={articleState.fontFamilyOption}
							options={fontFamilyOptions}
							title='Шрифт'
							onChange={handleChange('fontFamilyOption')}
						/>
						<RadioGroup
							name='fontSize'
							title='Размер шрифта'
							selected={articleState.fontSizeOption}
							options={fontSizeOptions}
							onChange={handleChange('fontSizeOption')}
						/>
						<Select
							title='Цвет шрифта'
							selected={articleState.fontColor}
							options={fontColors}
							onChange={handleChange('fontColor')}
						/>
						<Separator />
						<Select
							title='Цвет фона'
							selected={articleState.backgroundColor}
							options={backgroundColors}
							onChange={handleChange('backgroundColor')}
						/>
						<Select
							title='Ширина контента'
							selected={articleState.contentWidth}
							options={contentWidthArr}
							onChange={handleChange('contentWidth')}
						/>
						<div className={styles.bottomContainer}>
							<Button
								title='Сбросить'
								htmlType='reset'
								type='clear'
								onClick={handleReset}
							/>
							<Button
								title='Применить'
								htmlType='submit'
								type='apply'
								onClick={handleApply}
							/>
						</div>
					</form>
				</aside>
			)}
		</>
	);
};
