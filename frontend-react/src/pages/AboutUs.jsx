import { Link } from "react-router-dom";

const hotelValues = [
  {
    number: "01",
    icon: "✧",
    title: "Thoughtful Luxury",
    description:
      "Luxury is not about having more. It is about experiencing more of what matters: comfort, beauty, privacy, and the little details that make a stay unforgettable.",
  },
  {
    number: "02",
    icon: "⌘",
    title: "Genuine Hospitality",
    description:
      "We believe the finest hospitality begins with listening. Every welcome, recommendation, and personal touch is designed to make you feel truly at home.",
  },
  {
    number: "03",
    icon: "◈",
    title: "Lasting Memories",
    description:
      "The best journeys stay with us long after we return. We create spaces, experiences, and moments that become part of your own story.",
  },
];

const experiences = [
  {
    category: "REST & RECHARGE",
    title: "A sanctuary of calm",
    description:
      "Discover beautifully appointed rooms, considered details, and peaceful spaces made for slowing down.",
    image:
      "https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=1100&q=85",
    alt: "Elegant luxury hotel bedroom with a warm, relaxing atmosphere",
  },
  {
    category: "TASTE & DISCOVER",
    title: "A world of flavour",
    description:
      "From slow morning rituals to memorable evening dinners, every meal is an invitation to enjoy the moment.",
    image:
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1100&q=85",
    alt: "Beautifully presented fine dining experience",
  },
  {
    category: "UNWIND & RECONNECT",
    title: "Space to feel renewed",
    description:
      "Find your balance in serene surroundings designed to restore your energy and reconnect you with yourself.",
    image:
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1100&q=85",
    alt: "Luxury hotel pool surrounded by a peaceful setting",
  },
];

const team = [
  {
    name: "Alexander Bennett",
    role: "General Manager",
    image:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=650&q=85",
  },
  {
    name: "Isabella Laurent",
    role: "Director of Guest Experience",
    image:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=650&q=85",
  },
  {
    name: "Daniel Moreau",
    role: "Executive Chef",
    image:
      "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=650&q=85",
  },
];

function AboutUs() {
  return (
    <main className="about-page">
      {/* HERO */}
      <section className="about-hero">
        <div className="about-hero-overlay" />


        <div className="about-hero-content">
          <p className="about-eyebrow">
            <span /> THE ART OF EXCEPTIONAL HOSPITALITY
          </p>

          <h1>
            More than a stay.
            <br />
            <span>A feeling.</span>
          </h1>

          <p className="about-hero-description">
            A place where timeless elegance meets heartfelt hospitality,
            and every moment becomes a memory worth keeping.
          </p>

          <a href="#our-story" className="about-primary-button">
            Our story <span>↓</span>
          </a>
        </div>

        <div className="about-hero-footer">
          <span>AN INVITATION TO EXPERIENCE MORE</span>
          <span className="about-hero-scroll">SCROLL TO EXPLORE ↓</span>
        </div>
      </section>

      {/* INTRODUCTION / STORY */}
      <section className="about-story section-padding" id="our-story">
        <div className="about-story-grid">
          <div className="about-story-visual">
            <img
              className="about-story-main-image"
              src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=85"
              alt="Refined interior with natural materials and elegant furnishings"
              loading="lazy"
            />

            <div className="about-story-note">
              <span className="about-note-symbol">✳</span>
              <p>
                The beauty
                <br />
                of being here.
              </p>
            </div>

            <span className="about-image-caption">
              A DIFFERENT KIND OF ESCAPE
            </span>
          </div>

          <div className="about-story-content">
            <p className="about-eyebrow about-eyebrow-dark">
              <span /> OUR STORY
            </p>

            <h2 className="about-section-heading">
              Created with
              <br />
              <em>intention.</em>
              Experienced
              <br />
              with feeling.
            </h2>

            <p className="about-body-copy">
              MYHOTEL GRAND HOTEL was imagined around a simple idea: the
              most extraordinary stays are not defined by where you sleep,
              but by how a place makes you feel.
            </p>

            <p className="about-body-copy">
              We envisioned a destination where architecture tells a story,
              every room invites you to unwind, and genuine hospitality
              transforms ordinary moments into something remarkable.
            </p>

            <p className="about-body-copy">
              From the first warm welcome to the quiet moments before
              departure, every part of the MYHOTEL experience is shaped
              by a love for thoughtful details and meaningful connections.
            </p>

            <div className="about-signature">
              <span className="about-signature-line" />
              <div>
                <strong>The MYHOTEL Philosophy</strong>
                <small>Exceptional by nature. Personal by design.</small>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATISTICS */}
      <section className="about-stats">
        <div className="about-stat">
          <span className="about-stat-number">01</span>
          <p>One distinctive vision</p>
        </div>

        <div className="about-stat">
          <span className="about-stat-number">24/7</span>
          <p>Hospitality, always</p>
        </div>

        <div className="about-stat">
          <span className="about-stat-number">100%</span>
          <p>Heart in every detail</p>
        </div>

        <div className="about-stat">
          <span className="about-stat-number">∞</span>
          <p>Possibilities to discover</p>
        </div>
      </section>

      {/* PHILOSOPHY */}
      <section className="about-philosophy section-padding">
        <div className="about-section-intro">
          <p className="about-eyebrow">
            <span /> WHAT WE BELIEVE
          </p>

          <h2 className="about-section-heading">
            Luxury is an art.
            <br />
            <em>Hospitality is a feeling.</em>
          </h2>

          <p>
            We believe the smallest details often leave the deepest
            impressions. That belief shapes everything we do.
          </p>
        </div>

        <div className="about-values-grid">
          {hotelValues.map((value) => (
            <article className="about-value-card" key={value.number}>
              <div className="about-value-top">
                <span className="about-value-number">{value.number}</span>
                <span className="about-value-icon" aria-hidden="true">
                  {value.icon}
                </span>
              </div>

              <h3>{value.title}</h3>
              <p>{value.description}</p>

              <span className="about-value-decoration" aria-hidden="true">
                ↗
              </span>
            </article>
          ))}
        </div>
      </section>

      {/* FULL-WIDTH FEATURE */}
      <section className="about-quote-section">
        <div className="about-quote-overlay" />

        <div className="about-quote-content">
          <span className="about-quote-mark" aria-hidden="true">
            “
          </span>

          <p>
            The greatest luxury
            <br />
            is feeling <em>completely yourself.</em>
          </p>

          <span className="about-quote-caption">
            THE MYHOTEL WAY OF LIFE
          </span>
        </div>
      </section>

      {/* EXPERIENCES */}
      <section
        className="about-experiences section-padding"
        id="experiences"
      >
        <div className="about-experiences-heading">
          <div>
            <p className="about-eyebrow about-eyebrow-dark">
              <span /> THE MYHOTEL EXPERIENCE
            </p>

            <h2 className="about-section-heading">
              Designed for
              <br />
              <em>every kind of extraordinary.</em>
            </h2>
          </div>

          <p className="about-experiences-intro">
            Every journey is different. Discover the spaces, tastes,
            and moments that make your time with us uniquely yours.
          </p>
        </div>

        <div className="about-experience-grid">
          {experiences.map((experience, index) => (
            <article
              className={`about-experience-card ${
                index === 1 ? "about-experience-featured" : ""
              }`}
              key={experience.title}
            >
              <div className="about-experience-image">
                <img
                  src={experience.image}
                  alt={experience.alt}
                  loading="lazy"
                />
                <span className="about-experience-index">
                  0{index + 1}
                </span>
              </div>

              <div className="about-experience-info">
                <p className="about-experience-category">
                  {experience.category}
                </p>
                <h3>{experience.title}</h3>
                <p className="about-experience-description">
                  {experience.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* HOSPITALITY / SERVICE */}
      <section className="about-hospitality">
        <div className="about-hospitality-image">
          <img
            src="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1300&q=85"
            alt="A sophisticated luxury hotel with an inviting pool"
            loading="lazy"
          />
        </div>

        <div className="about-hospitality-content">
          <p className="about-eyebrow">
            <span /> THE PEOPLE BEHIND THE EXPERIENCE
          </p>

          <h2 className="about-section-heading">
            Service that feels
            <br />
            <em>like second nature.</em>
          </h2>

          <p>
            Beautiful spaces create the setting. People make it
            unforgettable.
          </p>

          <p>
            At MYHOTEL, hospitality is never just a checklist. It is the
            art of noticing, anticipating, and caring. It is remembering
            the little things, finding thoughtful solutions, and making
            every guest feel welcome without ever feeling hurried.
          </p>

          <a href="#our-team" className="about-text-link">
            Meet the people behind MYHOTEL <span>↗</span>
          </a>
        </div>
      </section>

      {/* TEAM */}
      <section className="about-team section-padding" id="our-team">
        <div className="about-team-heading">
          <div>
            <p className="about-eyebrow about-eyebrow-dark">
              <span /> OUR PEOPLE
            </p>

            <h2 className="about-section-heading">
              The faces of
              <br />
              <em>MYHOTEL.</em>
            </h2>
          </div>

          <p>
            Behind every exceptional experience is a team that cares
            deeply about getting the details right.
          </p>
        </div>

        <div className="about-team-grid">
          {team.map((person) => (
            <article className="about-team-card" key={person.name}>
              <div className="about-team-image">
                <img
                  src={person.image}
                  alt={`Portrait of ${person.name}`}
                  loading="lazy"
                />
              </div>

              <div className="about-team-info">
                <div>
                  <h3>{person.name}</h3>
                  <p>{person.role}</p>
                </div>

                <span aria-hidden="true">✳</span>
              </div>
            </article>
          ))}
        </div>

        <p className="about-team-note">
          A fictional team created for the MYHOTEL GRAND HOTEL concept.
        </p>
      </section>

      {/* CLOSING CTA */}
      <section className="about-cta-section" id="contact">
        <div className="about-cta-inner">
          <p className="about-eyebrow">
            <span /> YOUR STORY STARTS HERE
          </p>

          <h2>
            Some places are
            <br />
            <em>simply unforgettable.</em>
          </h2>

          <p>
            Discover a different perspective on hospitality. Discover
            the world of MYHOTEL.
          </p>
          {/*TODO: Open a modal for sending a message */}
          <a href="/contact" className="about-primary-button">
            Get in touch <span>↗</span>
          </a>
        </div>

        <div className="about-cta-decoration" aria-hidden="true">
          A
        </div>
      </section>
    </main>
  );
}

export default AboutUs;