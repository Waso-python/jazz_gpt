import {Container} from "@mui/material";

export const SectionWrapper = ({children, sx}: {children: any, sx?: {[x: string]: any}}) => {
    return (
        <Container
            sx={{
                backgroundColor: '#171717',
                borderRadius: '24px',
                padding: '20px',
                m: 0,
                ...sx
            }}
        >
            {children}
        </Container>
    )
}