import { styled } from "..";

export const ProductContainer = styled('main', {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    // align-items: stretch faz com que os elementos filhos do grid se estiquem para ocupar todo o espaço do grid
    alignItems: 'stretch',
    gap: '4rem',

    maxWidth: 1180,
    margin: '0 auto',
});

export const ImageContainer = styled('div', {
    width: '100%',
    maxWidth: 576,
    height: 576,
    background: 'linear-gradient(180deg, #1ea483 0%, #7465d4 100%)',
    borderRadius: 8,
    padding: '0.25rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    
    image: {
        objectFit: 'cover',
        width: '100%',
        height: '100%',
    }
});
export const ProductDetails = styled('div', {
    display: 'flex',
    flexDirection: 'column',
 
    h1: {
        fontSize: '$xxl',
        color: '$gray300',
    },

    span: {
        fontSize: '$xxl',
        color: '$green300',
        marginTop: '1rem',
        display: 'block',
    },

    p: {
        fontSize: '$md',
        color: '$gray300',
        marginTop: '2.5rem',
        lineHeight: '1.6',
    },

    button: {
        marginTop: 'auto',
        width: '100%',
        background: '$green500',
        borderRadius: 8,
        border: '0',
        padding: '1.25rem',
        color: '$white',
        fontWeight: 'bold',
        fontSize: '$md',
        cursor: 'pointer',
        
        '&:disabled': {
            opacity: 0.6,
            cursor: 'not-allowed',
        },

        '&:not(disabled):hover': {
            transition: 'background 0.2s',
            background: '$green300',
            
        }
    }
});


export const DetailsFallback = styled('div', {
    display: 'flex',
    flexDirection: 'column',
    
    borderRadius: 8,

    h1: {
        borderRadius: 8,
        padding: '2rem',
        background: '$gray800',
    },

    span: {
        borderRadius: 8,
        padding: '2rem',
        background: '$gray800',
        marginTop: '2rem',
        display: 'block',
    },

    p: {
        marginTop: '2.5rem',
        borderRadius: 8,
        padding: '6rem',
        background: '$gray800',
    },

    button: {
        marginTop: 'auto',
        width: '100%',
        background: '$gray800',
        borderRadius: 8,
        border: '0',
        padding: '2rem',
    }
});

export const ImageFallback = styled('div', {
    width: 576,
    height: 576,
    background: '$gray800',
    borderRadius: 8,
});

