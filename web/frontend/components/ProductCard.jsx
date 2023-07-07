import {
	Button,
	Collapsible,
	FormLayout,
	LegacyCard,
	LegacyStack,
	TextField,
	Toast,
	Frame,
} from '@shopify/polaris';
import {useCallback, useState} from 'react';
import {Variant} from './index';
import {useAuthenticatedFetch, useNavigate} from '@shopify/app-bridge-react';

export const ProductCard = (props) => {
	const [title, setTitle] = useState(props.title);
	const [description, setDescription] = useState(props.description);
	const [showVariants, setShowVariants] = useState(false);
	const [variants, setVariants] = useState(props.variants);
	const [showToast, setShowToast] = useState(false);
	const [isUpdating, setIsUpdating] = useState(false);
	const fetch = useAuthenticatedFetch();
	const navigate = useNavigate();

	const toastToggle = useCallback(() => {
		setShowToast(true);
	}, []);

	const toastMarkup = showToast ? (
		<Toast
			content="Product Update Succesfully"
			onDismiss={() => setShowToast(false)}
			duration={4000}
		></Toast>
	) : null;

	const updateHandler = async () => {
		isUpdating(true);
		const updateProduct = {
			id: props.id,
			title,
			description,
			variants,
		};

		const response = await fetch('/api/products/update', {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(updateProduct),
		});

		if (response.ok) {
			toastToggle();
		}
		setIsUpdating(false);
	};

	const updateVariant = (id, price) => {
		setVariants((prev) => {
			const updated = prev.map((variant) => {
				if (id === variant.id) {
					return {...variant, price};
				}
				return variant;
			});
			return updated;
		});
	};

	return (
		<Frame>
			<LegacyCard
				sectioned
				title="Products List"
				secondaryFooterActions={[
					{
						content: 'View Admin',
						onAction: () =>
							navigate(
								{name: 'Product', resource: {id: props.legacyId}},
								{target: 'new'}
							),
					},
				]}
				primaryFooterAction={{
					content: isUpdating ? 'Updating...' : 'Update Products',
					onAction: updateHandler,
				}}
			>
				<LegacyStack spacing="extraLoose">
					<LegacyStack.Item>
						<img src={props.image} width="250px" />
					</LegacyStack.Item>
					<LegacyStack.Item fill>
						<FormLayout>
							<TextField
								label="Product Title"
								value={title}
								onChange={setTitle}
								disabled={isUpdating}
							></TextField>
							<TextField
								multiline={4}
								label="Product Description"
								value={description}
								onChange={setDescription}
								disabled={isUpdating}
							></TextField>
							<Button primary onClick={() => setShowVariants((prev) => !prev)}>
								Show variants
							</Button>
							<Collapsible open={showVariants}>
								<Variant
									variants={variants}
									isUpdating={isUpdating}
									updateVariant={updateVariant}
								></Variant>
							</Collapsible>
						</FormLayout>
					</LegacyStack.Item>
				</LegacyStack>
			</LegacyCard>
			{toastMarkup}
		</Frame>
	);
};
