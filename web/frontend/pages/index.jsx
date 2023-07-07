import {
	Page,
	Layout,
	FormLayout,
	TextField,
	LegacyCard,
	Toast,
	Frame,
} from '@shopify/polaris';

import {ProductsCard, ProductList} from '../components';
import {useAppQuery} from '../hooks';

import {useCallback, useState} from 'react';
import {useNavigate} from '@shopify/app-bridge-react';

export default function HomePage() {
	const [userName, setUserName] = useState('');
	const [email, setEmail] = useState('');
	const [showToast, setShowToast] = useState(false);
	const navigate = useNavigate();

	const {data, isLoading, refetch, isRefetching} = useAppQuery({
		url: '/api/products',
	});

	const toastToggle = useCallback(() => {
		setShowToast(true);
	}, []);

	const userData = () => {
		toastToggle();
		localStorage.setItem('name', userName);
		localStorage.setItem('email', email);
		setEmail('');
		setUserName('');
	};

	const toastMarkup = showToast ? (
		<Toast
			content="UserDetails Update Succesfully"
			onDismiss={() => setShowToast(false)}
			duration={4000}
		></Toast>
	) : null;

	return (
		<Frame>
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
							secondaryFooterActions={[
								{
									content: 'User Details',
									onAction: () => navigate('/pagename'),
								},
							]}
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
		</Frame>
	);
}
