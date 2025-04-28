import { useState, useEffect, useRef } from 'react';

interface UseDisclosureCallbacks {
	onOpen?: () => void;
	onClose?: () => void;
}

export const useDisclosure = (
	initialState = false,
	{ onOpen, onClose }: UseDisclosureCallbacks = {}
) => {
	const [isOpen, setIsOpen] = useState(initialState);
	const sidebarRef = useRef<HTMLDivElement>(null); // ссылка на элемент сайдбара

	useEffect(() => {
		setIsOpen(initialState);
	}, [initialState]);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				isOpen &&
				sidebarRef.current &&
				!sidebarRef.current.contains(event.target as Node)
			) {
				setIsOpen(false); // Закрываем сайдбар
				onClose?.(); // Вызываем onClose, если он передан
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [isOpen]);

	const open = () => {
		setIsOpen(true);
		onOpen?.();
	};

	const close = () => {
		setIsOpen(false);
		onClose?.();
	};

	const toggle = () => {
		isOpen ? close() : open();
	};

	return { isOpen, toggle, open, close, sidebarRef };
};
