import { useParams } from 'react-router-dom';
import EpicWorkPage from '../pages/EpicWorkPage';

export const EpicWorkLayout = () => {
    const { epicWorkId } = useParams();

    return (
        <div>
            <EpicWorkPage epicWorkId={epicWorkId} />
        </div>
    );
};

