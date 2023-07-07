import {EmptyState, Layout, Spinner, VerticalStack} from '@shopify/polaris';
import {ProductCard} from './ProductCard';

export const ProductList = ({data, isRefetching, isLoading}) => {
	if (isLoading || isRefetching) {
		return (
			<Layout>
				<Spinner></Spinner>
			</Layout>
		);
	}
	return (
		<Layout>
			{data?.product.length ? (
				data.product.map((product, index) => (
					<Layout.Section key={index}>
						<VerticalStack gap="2">
							<ProductCard {...product}></ProductCard>
						</VerticalStack>
					</Layout.Section>
				))
			) : (
				<Layout.Section>
					<EmptyState heading="no product is found" image="">
						<p>Add product using the card above</p>
					</EmptyState>
				</Layout.Section>
			)}
		</Layout>
	);
};
