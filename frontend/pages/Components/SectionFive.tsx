import { Accordion, Text, Container, Title, Badge, useMantineTheme } from '@mantine/core';
import { FiCoffee, FiCloudSnow, FiAnchor, FiFlag } from "react-icons/fi";

const SectionFive = () => {
    const theme = useMantineTheme();

    return (
        <section id="section-five">
            <Container>
                <div style={{ marginTop: 60 }}>
                    {/* <div style={{ textAlign: 'left' }}><Badge variant="filled" color="yellow">FAQs</Badge></div> */}
                    <Text>
                        <Title order={1} style={{ marginTop: 10 }}>Întrebări frecvente</Title>
                    </Text>
                </div>

                <Accordion variant="contained" style={{ marginBottom: 60 }}>
                    <Accordion.Item value="item1">
                        <Accordion.Control icon={<FiFlag size={20} style={{ color: "var(--custom-red)" }} />}>
                            Respectă normele GDPR și standardele de utilizare UE?
                        </Accordion.Control>
                        <Accordion.Panel>Da, inginerii noștri acordă o prioritate crescută siguranței datelor și a utilizatorilor. 
                            Aplicația este construită respectând toate standardele impuse de Uniunea Europeană.
                        </Accordion.Panel>
                    </Accordion.Item>

                    <Accordion.Item value="item2">
                        <Accordion.Control icon={<FiFlag size={20} style={{ color: "var(--custom-red)" }} />}>
                            Este un mediu sigur?
                        </Accordion.Control>
                        <Accordion.Panel>Arhitectura aplicației conține toate structurile necesare menținerii securității ridicate pe toate planurile.</Accordion.Panel>
                    </Accordion.Item>

                    <Accordion.Item value="item3">
                        <Accordion.Control icon={<FiFlag size={20} style={{ color: "var(--custom-red)" }} />}>
                            De ce am nevoie ca să folosesc platforma?
                        </Accordion.Control>
                        <Accordion.Panel>Un email de contact valid, camera funcțională și cardul de identitate. Algoritmii noștri citesc și interpretează datele automat din buletin, fiind
                            realizată și o verificare a identității la înregistrare.
                        </Accordion.Panel>
                    </Accordion.Item>
                </Accordion>
            </Container>
        </section>
    );

};

export default SectionFive;