import { useMantineTheme, Container, Text, Title, Grid, Card, Image, Badge, Button, Group } from '@mantine/core';

const SectionFour = () => {
    const theme = useMantineTheme();

    return (
        <section id="section-four">
            <Container style={{ marginTop: 0 }}>
                {/* <Text color="black" align="center">
                    <Title order={1} mb="30px">These cards are really nice</Title>
                </Text> */}

                <Grid>
                    <Grid.Col xs={12} sm={4} md={4} lg={4}>
                        <Card shadow="md" p="lg" style={{ height: '100%'}}>
                            <Card.Section>
                                <Image src="/card1.jpg" />
                            </Card.Section>

                            <Group position="apart" style={{ marginBottom: 5, marginTop: theme.spacing.sm }}>
                                <Text weight={500}>De ce?</Text>
                                {/* <Badge color="yellow" variant="light">
                                    Cool badge
                                </Badge> */}
                            </Group>

                            <Text size="sm">
                            Modalitatea de desfășurare a proceselor birocratice din România nu este adaptată nevoilor secolului 21. De aceea,
                            AutoFlow reprezintă un pas mic către digitalizare și un pas mare către modernizarea societății în care trăim.
                            </Text>

                            {/* <Button variant="light" color="yellow" fullWidth mt="14px">
                                Find out
                            </Button> */}
                        </Card>
                    </Grid.Col>

                    <Grid.Col xs={12} sm={4} md={4} lg={4}>
                        <Card shadow="md" p="lg" style={{ height: '100%' }}>
                            <Card.Section>
                                <Image src='/card2.jpg' />
                            </Card.Section>

                            <Group position="apart" style={{ marginBottom: 5, marginTop: theme.spacing.sm }}>
                                <Text weight={500}>Ce?</Text>
                                {/* <Badge color="yellow" variant="light">
                                    Cool badge 2
                                </Badge> */}
                            </Group>

                            <Text size="sm">
                            Soluție software prietenoasă destinată creării și automatizării proceselor 
birocratice, astfel economisind timpul și banii părților implicate. În plus, contribuie și la protejarea mediul înconjurător prin diminuarea emisiei de C02 și a consumului de hărtie.
                            </Text>

                            {/* <Button variant="light" color="yellow" fullWidth mt="14px">
                                Find out
                            </Button> */}
                        </Card>
                    </Grid.Col>

                    <Grid.Col xs={12} sm={4} md={4} lg={4}>
                        <Card shadow="md" p="lg" style={{ height: '100%' }}>
                            <Card.Section>
                                <Image src='/card3.jpg' />
                            </Card.Section>

                            <Group position="apart" style={{ marginBottom: 5, marginTop: theme.spacing.sm }}>
                                <Text weight={500}>Cum?</Text>
                                {/* <Badge color="yellow" variant="light">
                                    Cool badge 3
                                </Badge> */}
                            </Group>

                            <Text size="sm">
                            Produsul nostru este prietenos cu orice tip de utilizator, astfel că nu necesită experiență în domeniul IT. Tot ce trebuie să știi
este răspunsul la întrebările: De ce am nevoie? De la cine? Când?
                            </Text>

                            {/* <Button variant="light" color="yellow" fullWidth mt="14px">
                                Find out
                            </Button> */}
                        </Card>
                    </Grid.Col>
                </Grid>

            </Container>
        </section>
    );
};

export default SectionFour;