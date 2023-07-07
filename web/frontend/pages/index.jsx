import {
	Page,
	Layout,
	FormLayout,
	TextField,
	LegacyCard,
} from '@shopify/polaris';

import {ProductsCard, ProductList} from '../components';
import {useAppQuery} from '../hooks';

import {useState} from 'react';
import {Toast} from '@shopify/app-bridge-react';

export default function HomePage() {
	const {data, isLoading, refetch, isRefetching} = useAppQuery({
		url: '/api/products',
	});
	const [userName, setUserName] = useState('');
	const [email, setEmail] = useState('');
	const [showToast, setShowToast] = useState(false);

	const toastMarkup = showToast ? (
		<Toast
			content="Added User Successfully"
			onDismiss={setShowToast(false)}
			duration={4000}
		></Toast>
	) : (
		''
	);

	const userData = () => {
		setShowToast(true);
		localStorage.setItem('name', userName);
		localStorage.setItem('email', email);
		setEmail('');
		setUserName('');
	};

	console.log(data);

	return (
		<>
			<Page
				title={
					localStorage.getItem('name')
						? ' Dashboard ' + `(${localStorage.getItem('email')})`
						: 'Dashboard'
				}
			>
				<Layout>
					<Layout.Section>
						<LegacyCard
							title="User Details"
							sectioned
							primaryFooterAction={{content: 'Submit', onAction: userData}}
						>
							<FormLayout>
								<TextField
									label="Name"
									value={userName}
									onChange={setUserName}
								></TextField>
								<TextField
									label="email"
									value={email}
									onChange={setEmail}
								></TextField>
							</FormLayout>
						</LegacyCard>
					</Layout.Section>
					<Layout.Section>
						<ProductsCard />
					</Layout.Section>
					<Layout.Section>
						<ProductList
							data={data}
							isLoading={isLoading}
							isRefetching={isRefetching}
						></ProductList>
					</Layout.Section>
				</Layout>
			</Page>
			{toastMarkup}
		</>
	);
}
