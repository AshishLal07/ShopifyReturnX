import {IndexTable, LegacyCard, TextField} from '@shopify/polaris';

export const Variant = ({variants, updateVariant, isUpdating}) => {
	return (
		<LegacyCard sectioned title="Variants">
			<IndexTable
				itemCount={variants.length}
				resourceName={{singular: 'variant', plural: 'variants'}}
				headings={[{title: 'Variant'}, {title: 'Price'}]}
				selectable={false}
			>
				{variants.map((variant) => (
					<IndexTable.Row key={variant.id}>
						<IndexTable.Cell>
							<TextField
								value={variant.title}
								disabled
								readOnly
								label="Variants"
								labelHidden
							></TextField>
						</IndexTable.Cell>
						<IndexTable.Cell>
							<TextField
								value={variant.price}
								label="Price"
								labelHidden
								type="number"
								prefix="$"
								onChange={(price) => updateVariant(variant.id, price)}
								disabled={isUpdating}
							></TextField>
						</IndexTable.Cell>
					</IndexTable.Row>
				))}
			</IndexTable>
		</LegacyCard>
	);
};
