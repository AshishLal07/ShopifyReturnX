import {
	Card,
	Page,
	Layout,
	TextContainer,
	Text,
	FormLayout,
	TextField,
} from '@shopify/polaris';
import {TitleBar, useNavigate} from '@shopify/app-bridge-react';
import {useState} from 'react';

export default function PageName() {
	const navigate = useNavigate();
	const [userName, setUserName] = useState(localStorage.getItem('name'));
	const [email, setEmail] = useState(localStorage.getItem('email'));

	if (userName === null || email === null) {
		navigate('/');
	}

	return (
		<Page
			title="User Details"
			primaryAction={{content: 'HomePage', onAction: () => navigate('/')}}
		>
			<Layout>
				<Layout.Section>
					<FormLayout>
						<TextField value={userName} disabled></TextField>
						<TextField value={email} disabled></TextField>
					</FormLayout>
				</Layout.Section>
			</Layout>
		</Page>
	);
}
