import PageLayout from '../PageLayout/PageLayout';
import GameBanner from '../../components/GameBanner/GameBanner';
import HorizontalSlider from '../../components/HorizontalSlider/HorizontalSlider';
import { ClanCard } from '../../components/ClanCard/ClanCard';
import { DevLogCard } from '../../components/DevLogCard/DevLogCard';
import { clans, devLogs } from '../../data/gameData';

import './Games.css';

/* ---------- Страница «Игры» ---------- */

function Games() {
  const renderClan = (clan: typeof clans[number]) => (
    <ClanCard data={clan} />
  );

  const renderDevLog = (log: typeof devLogs[number]) => (
    <DevLogCard data={log} />
  );

  return (
    <PageLayout useBackground backgroundImage="/makets/games_background.jpg">
      <div className="games-page">
        {/* Баннер Лариара */}
        <GameBanner />

        {/* Секция: Кланы */}
        <div className="games-page__clans-section">
          <h2 className="section__title">Кланы Лариара</h2>
          <p className="section__intro">
            Шесть могущественных родов. Шесть стихий. Один мир, разорванный на части войной.
          </p>
          <HorizontalSlider
            items={clans}
            renderItem={renderClan}
            itemKey={(c) => c.id}
            visibleCount={3}
          />
        </div>

        {/* Секция: Dev-логи */}
        <div className="games-page__logs-section">
          <h2 className="section__title">Dev-логи</h2>
          <p className="section__intro">
            Как создаётся Лариар — от проектирования мира до боевой системы.
          </p>
          <HorizontalSlider
            items={devLogs}
            renderItem={renderDevLog}
            itemKey={(l) => l.id}
            visibleCount={3}
          />
        </div>
      </div>
    </PageLayout>
  );
}

export default Games;
