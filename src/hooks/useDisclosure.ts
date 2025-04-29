import { useState, useEffect, useRef } from 'react';

interface UseDisclosureCallbacks {
	onOpen?: () => void;
	onClose?: () => void;
}

export const useDisclosure = (
	initialState = false,
	{ onOpen, onClose }: UseDisclosureCallbacks = {}
) => {
	const [isFormOpen, setIsOpen] = useState(initialState);
	const sidebarRef = useRef<HTMLDivElement>(null); // ссылка на элемент сайдбара

	useEffect(() => {
		setIsOpen(initialState);
	}, [initialState]);

	useEffect(() => {
		if (!isFormOpen) {
			return;
		}
		const handleClickOutside = (event: MouseEvent) => {
			if (isFormOpen && sidebarRef.current && event.target instanceof Node) {
				if (!sidebarRef.current.contains(event.target)) {
					setIsOpen(false);
					onClose?.();
				}
			}
		};
		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [isFormOpen, onClose]);

	const open = () => {
		setIsOpen(true);
		onOpen?.();
	};

	const close = () => {
		setIsOpen(false);
		onClose?.();
	};

	const toggleForm = () => {
		isFormOpen ? close() : open();
	};

	return { isFormOpen, toggleForm, open, close, sidebarRef };
};
