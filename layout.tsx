// ...existing code...
import { useRouter } from 'next/router';

export default function Layout() {
    const router = useRouter();

    return (
        <div>
            {/* ...existing sidebar code... */}
            <div className="sidebar">
                {/* ...existing menu items... */}
                <div className="menu-item">
                    <span>Location</span>
                    <div className="sub-menu">
                        <div onClick={() => router.push('/regions')}>Regions</div>
                        <div onClick={() => router.push('/countries')}>Countries</div>
                        <div onClick={() => router.push('/cities')}>Cities</div>
                    </div>
                </div>
            </div>
            {/* ...existing code... */}
        </div>
    );
}
