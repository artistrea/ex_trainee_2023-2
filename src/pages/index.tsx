import Head from "next/head";
import styles from "@/styles/Home.module.css";
import { FormEvent, useEffect, useState } from "react";
import { createContact } from "@/clientApi/contacts/createContact";
import Image from "next/image";

const exampleImages = [
  {
    alt: "Cardapio1",
    src: "https://cdn.dribbble.com/users/3268956/screenshots/6326263/502_4x.jpg?resize=300x250&vertical=center",
    links_to: "#",
  },
  {
    alt: "Cardapio2",
    src: "https://cdn.dribbble.com/userupload/9953604/file/original-c15dd2b3d629bba16da4fc190da0252e.jpg?resize=300x200&vertical=top",
    links_to: "#",
  },
  {
    alt: "Cardapio3",
    src: "https://cdn.dribbble.com/users/3268956/screenshots/16316904/media/bd00e6ef7d03eb61d6a6c7193750c5ae.jpg?resize=300x200&vertical=center",
    links_to: "#",
  },
];

function ExampleImages() {
  const [XSpacing, setXSpacing] = useState(50);
  const [YSpacing, setYSpacing] = useState(75);

  useEffect(() => {
    function checkWidth() {
      if (window.innerWidth < 900) {
        setXSpacing(12.5);
        setYSpacing(50);
      } else if (window.innerWidth < 1400) {
        setXSpacing(50);
        setYSpacing(75);
      } else {
        setXSpacing(200);
        setYSpacing(150);
      }
    }

    window.addEventListener("resize", checkWidth);

    checkWidth();

    return () => window.removeEventListener("resize", checkWidth);
  }, []);

  function leftDisl(i: number) {
    return ((exampleImages.length - 1) / 2 - i) * XSpacing;
  }

  function topDisl(i: number) {
    return ((exampleImages.length - 1) / 2 - i) * YSpacing;
  }

  return (
    <div
      className={styles.exampleImages}
      style={{ height: 200 + YSpacing * (exampleImages.length - 1) }}
    >
      <ul>
        {exampleImages.map((img, i) => (
          <li
            style={{
              position: "absolute",
              left: `calc(50% ${leftDisl(i) < 0 ? "+" : "-"} ${Math.abs(
                leftDisl(i)
              )}px)`,
              translate: "-50% -50%",
              top: `calc(50% ${topDisl(i) >= 0 ? "+" : "-"} ${Math.abs(
                topDisl(i)
              )}px)`,
            }}
            key={i}
          >
            <Image width={300} height={200} src={img.src} alt={img.alt} />
          </li>
        ))}
      </ul>
    </div>
  );
}

const whyUs = [
  {
    title: "Fácil de usar",
    description:
      "Nosso sistema é fácil de usar, você pode criar seu cardápio em poucos cliques.",
  },
  {
    title: "Fácil de manter",
    description:
      "Altere seu cardápio quando quiser, sem precisar de conhecimento técnico.",
  },
  {
    title: "Customizável",
    description:
      "Altere as cores, imagens e tipografia do template facilmente.",
  },
  {
    title: "Personalize ainda mais",
    description:
      "Entre em contato conosco para criar um cardápio totalmente personalizado.",
  },
];

export default function Home() {
  const [data, setData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  function handleCreateContact(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    createContact(data).then(({ data }) => {
      alert(
        `A demonstração foi enviada para ${data.email} por email. Vejo você por lá!`
      );
    });
  }

  return (
    <>
      <main className={styles.main}>
        <section id="contact" className={styles.section1}>
          <div>
            <h1 className={styles.h1}>
              Quer um
              <br />
              <span>
                cardápio
                <br />
                delicioso?
              </span>
            </h1>
            <p>Criar e manter um cardápio nunca foi tão fácil!</p>
            <ExampleImages />
          </div>
          <div>
            <form className={styles.form} onSubmit={handleCreateContact}>
              <h2 className={styles.h2}>
                Preencha os campos e receba uma <span>demonstração</span>
              </h2>
              <input
                type="text"
                name="name"
                value={data.name}
                onChange={(e) =>
                  setData((d) => ({
                    ...d,
                    name: e.target.value,
                  }))
                }
                placeholder="Name"
              />
              <input
                type="email"
                name="email"
                value={data.email}
                onChange={(e) =>
                  setData((d) => ({
                    ...d,
                    email: e.target.value,
                  }))
                }
                placeholder="Email"
              />
              <input
                type="text"
                name="phone"
                value={data.phone}
                onChange={(e) =>
                  setData((d) => ({
                    ...d,
                    phone: e.target.value,
                  }))
                }
                placeholder="Phone"
              />
              <textarea
                name="message"
                value={data.message}
                onChange={(e) =>
                  setData((d) => ({
                    ...d,
                    message: e.target.value,
                  }))
                }
                placeholder="Message"
              />
              <button className="btn btn-primary">
                Veja como é criar seu cardápio conosco
              </button>
              <div className={styles.contactDetails}>
                <span>
                  <strong>admin@struct.unb.br</strong>
                </span>
                <span>
                  <strong>+55 61 99999-9999</strong>
                </span>
              </div>
            </form>
          </div>
        </section>
        <section id="whyUs" className={styles.section2}>
          <h2 className={`${styles.h2}`}>Por que nós?</h2>
          <p>
            Nós da <strong>Struct</strong> acreditamos que a tecnologia pode
            ajudar a melhorar a experiência de todos. Por isso, criamos um
            sistema que permite que você crie e mantenha seu cardápio de forma
            fácil e rápida.
          </p>
          <ul className={styles.whyUs}>
            {whyUs.map((item, i) => (
              <li key={i}>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </>
  );
}
