import { Text, Container, Anchor, MediaQuery, Button, Image, Grid, Center } from '@mantine/core';
import { MdOutlineArrowDownward } from "react-icons/md";
import { Link } from 'react-scroll';

const About = () => {
    //const theme = useMantineTheme();

    return (
        <section id="about">
            <Container fluid>

                <div className="about-content">
                <Center>
                    <Image src='/logo.png' style={{ width: '50%'}} />
                </Center>
                  
                    {/* <div style={{ marginBottom: 15 }}>
                        <Text transform="uppercase" weight={500} color="yellow">
                            MADE WITH REACT AND MANTINE
                        </Text>
                    </div>

                    <div style={{ marginBottom: 15 }}>
                        <Text>
                            <MediaQuery query="(max-width: 768px)" styles={{ fontSize: '2.8rem !important' }}>
                                <h1 className="title">Simple Mantine Template</h1>
                            </MediaQuery>
                        </Text>
                    </div> */}

                    <div style={{ marginBottom: 25 }}>
                        <Text size="xl" color="black">
                            Debirocratizarea domeniului public din România prin soluții digitale simple.
                        </Text>
                    </div>

                    <div className="buttons">
                        <Link to="section-four" smooth duration={500}>
                            <Button color="yellow" rightIcon={<MdOutlineArrowDownward size={16} />} radius="lg" size="md">Despre noi</Button>
                        </Link>

                        <Button variant="default" radius="lg" size="md">Sign in</Button>
                    </div>

                </div>

            </Container>

        </section>
    );
};

export default About;