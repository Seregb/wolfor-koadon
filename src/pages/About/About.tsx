import PageLayout from '../PageLayout/PageLayout';
import { SectionCards } from '../../components/Card/Card';

import './About.css';

/* ---------- Страница «О проекте» ---------- */

function About() {
  return (
    <PageLayout useBackground backgroundImage="/makets/about_background.jpg">
      <div className="about-page">
        {/* Заголовок */}
        <div className="about-page__header">
          <h1 className="about-page__title">О проекте</h1>
          <p className="about-page__subtitle">
            Wolfor Koadon — эпическая вселенная, существующая в книгах и играх.
          </p>
        </div>

        {/* Основной контент */}
        <div className="about-page__content">
          {/* О проекте */}
          <section className="about-page__section">
            <h2 className="about-page__section-title">
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M12 16v-4" />
                <path d="M12 8h.01" />
              </svg>
              О проекте
            </h2>
            <div className="about-page__text">
              <p>
                <strong>Wolfor Koadon</strong> — это масштабный проект, объединяющий
                художественную литературу и видеоигры в единую вселенную. Центральная
                нить цикла «Сэт» — эпическая сага о магии, судьбе и человеческой
                воле, разворачивающаяся на континентах Акиар и Лариар.
              </p>
              <p>
                Книги раскрывают мир через судьбы героев, а игры позволяют
                погрузиться в него — исследовать территории кланов, сражаться с
                рунической магией и проживать собственные истории.
              </p>
            </div>
          </section>

          {/* Цикл «Сэт» */}
          <section className="about-page__section">
            <h2 className="about-page__section-title">
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
              </svg>
              Цикл «Сэт»
            </h2>
            <div className="about-page__text">
              <p>
                Семь томов, семь глав великой саги. От находки Руны в руинах
                крепости Хараз до финального выбора Эрана — каждая книга раскрывает
                новый слой мира и углубляет конфликт между светом и тьмой.
              </p>
              <p>
                Первый том «Пробуждение Руны» (2019) заложил основу вселенной.
                Финальный том «Сага Сэта» (2027) завершит историю, которую
                читатели следят уже семь лет.
              </p>
            </div>
          </section>

          {/* Игры */}
          <section className="about-page__section">
            <h2 className="about-page__section-title">
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="2" y="6" width="20" height="12" rx="2" />
                <path d="M12 12h.01" />
                <path d="M17 12h.01" />
                <path d="M6 12h.01" />
              </svg>
              Проект «Лариар»
            </h2>
            <div className="about-page__text">
              <p>
                Игра «Лариар» — погружение в мир рыцарских орденов, клановых
                конфликтов и рунической магии. Шесть кланов с уникальными
                стихийными способностями, тактические бои, нарративный дизайн,
                связанный с книжной сагой.
              </p>
              <p>
                Разработка ведётся с открытым dev-логам — каждый шаг проекта
                описан и доступен для чтения.
              </p>
            </div>
          </section>

          {/* Контакты */}
          <section className="about-page__section">
            <h2 className="about-page__section-title">
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <path d="m22 6-10 7L2 6" />
              </svg>
              Контакты
            </h2>
            <div className="about-page__contacts">
              <a
                href="mailto:seregb68@gmail.com"
                className="about-page__contact-link"
              >
                <span className="about-page__contact-label">Email</span>
                <span className="about-page__contact-value">seregb68@gmail.com</span>
              </a>
              <a
                href="https://x.com"
                className="about-page__contact-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="about-page__contact-label">X (Twitter)</span>
                <span className="about-page__contact-value">@wolfor_koadon</span>
              </a>
              <a
                href="https://youtube.com"
                className="about-page__contact-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="about-page__contact-label">YouTube</span>
                <span className="about-page__contact-value">Wolfor Koadon</span>
              </a>
            </div>
          </section>
        </div>

        {/* Переход к другим разделам */}
        <div className="about-page__sidebar">
          <h2 className="about-page__sidebar-title">Другие разделы</h2>
          <SectionCards />
        </div>
      </div>
    </PageLayout>
  );
}

export default About;
