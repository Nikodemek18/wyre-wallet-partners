// Import your background here
import ExampleBackground from './Assets/PartnerBackgrounds/meta-mask-background.png'
import MetaMaskBackground from './Assets/PartnerBackgrounds/meta-mask-background.png'
import TrustWalletBackground from './Assets/PartnerBackgrounds/trust-wallet-background.png'
import PortisBackground from './Assets/PartnerBackgrounds/portis-background.png'
import FortmaticBackground from './Assets/PartnerBackgrounds/fortmatic-background.png'
import BinanceBackground from './Assets/PartnerBackgrounds/binance-background.png'
import LolliBackground from './Assets/PartnerBackgrounds/lolli-background.png'
import CompoundFinanceBackground from './Assets/PartnerBackgrounds/compound-finance-background.png'
import CelsiusBackground from './Assets/PartnerBackgrounds/celsius-background.png'
import JouleBackground from './Assets/PartnerBackgrounds/JouleBackground.png'

// Import your logo here
import ExampleLogo from './Assets/PartnerLogos/meta-mask-logo.png'
import MetaMaskLogo from './Assets/PartnerLogos/meta-mask-logo.png'
import TrustWalletLogo from './Assets/PartnerLogos/trust-wallet-logo.png'
import PortisLogo from './Assets/PartnerLogos/portis-logo.png'
import FortmaticLogo from './Assets/PartnerLogos/fortmatic-logo.svg'
import BinanceLogo from './Assets/PartnerLogos/binance-logo.svg'
import LolliLogo from './Assets/PartnerLogos/lolli-logo.png'
import CompoundFinanceLogo from './Assets/PartnerLogos/compound-finance-logo.png'
import CelsiusLogo from './Assets/PartnerLogos/celsius-logo.png'
import JouleLogo from './Assets/ParnterLogos/joule-logo.png'

// Import your favicon here
import ExampleFavicon from './Assets/PartnerFavicons/wyre-favicon.ico'
import MetaMaskFavicon from './Assets/PartnerFavicons/meta-mask-favicon.ico'
import TrustWalletFavicon from './Assets/PartnerFavicons/trust-wallet-favicon.ico'
import PortisFavicon from './Assets/PartnerFavicons/portis-favicon.ico'
import FortmaticFavicon from './Assets/PartnerFavicons/fortmatic-favicon.ico'
import BinanceFavicon from './Assets/PartnerFavicons/binance-favicon.ico'
import LolliFavicon from './Assets/PartnerFavicons/lolli-favicon.ico'
import CompoundFinanceFavicon from './Assets/PartnerFavicons/compound-finance-favicon.ico'
import CelsiusFavicon from './Assets/PartnerFavicons/celsius-favicon.ico'
import JouleFavicon from './Assets/PartnersFavicons/joule-favicon.ico'

export const partners = {
    example: { // define your object in all lowercase letters
        name: 'Example Wallet', // The name may have spaces if desired
        connector: 'MetaMask', // Optional. The connector should have no spaces. This is the Web3 React Connector and will connect to your user's wallet and auto-populate their Ethereum address.
        background: ExampleBackground, // Import your background
        logo: ExampleLogo, // Import your logo
        favicon: ExampleFavicon, // Import your favicon
        currency: 'ETH', // Optional. Locks in a currency for purchase. Options are 'BTC', 'ETH', 'DAI', or 'USDC'
        blurred: true
    },
    localhost: {
        name: 'MetaMask',
        connector: 'MetaMask',
        background: ExampleBackground,
        logo: ExampleLogo,
        favicon: ExampleFavicon,
        currency: 'ETH',
        blurred: true
    },
    metamask: {
        name: 'MetaMask',
        connector: 'MetaMask',
        background: MetaMaskBackground,
        logo: MetaMaskLogo,
        favicon: MetaMaskFavicon,
        blurred: true
    },
    trustwallet: {
        name: 'Trust Wallet',
        connector: 'TrustWallet',
        background: TrustWalletBackground,
        logo: TrustWalletLogo,
        favicon: TrustWalletFavicon,
        blurred: true
    },
    portis: {
        name: 'Portis',
        connector: 'Portis',
        background: PortisBackground,
        logo: PortisLogo,
        favicon: PortisFavicon,
        blurred: true
    },
    fortmatic: {
        name: 'Fortmatic',
        connector: 'Fortmatic',
        background: FortmaticBackground,
        logo: FortmaticLogo,
        favicon: FortmaticFavicon,
        blurred: true
    },
    binance: {
        name: 'Binance',
        background: BinanceBackground,
        logo: BinanceLogo,
        favicon: BinanceFavicon,
        blurred: true
    },
    lolli: {
        name: 'Lolli',
        background: LolliBackground,
        logo: LolliLogo,
        favicon: LolliFavicon,
        currency: 'BTC',
        blurred: true
    },
    'compound-finance': {
        name: 'Compound Finance',
        background: CompoundFinanceBackground,
        logo: CompoundFinanceLogo,
        favicon: CompoundFinanceFavicon,
        blurred: true
    },
    celsius: {
        name: 'Celsius Network',
        background: CelsiusBackground,
        logo: CelsiusLogo,
        favicon: CelsiusFavicon,
        currency: 'BTC',
        blurred: false  
    },
    joule: {
    name: 'Joule labs',
    background: JouleBackground,
    logo: JouleLogo,
    favicon: JouleFavicon,
    currency: 'BTC',
    blurred: true

    }

export function getIdFromPartner(partner) {
    return partners[partner]
}