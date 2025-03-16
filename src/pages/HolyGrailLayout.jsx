import { createPortal } from "react-dom";
import styles from "./HolyGrailLayout.module.css";
import { useState } from "react";

const HolyGrailLayout = () => {
  return (
    <div className={styles.layout}>
      <header className={styles.header}>Header</header>
      <div className={styles.container}>
        <aside className={styles.sidebar}>Sidebar

        <Modal/>
        </aside>
        <main className={styles.mainContent}>
          Main Content
          <Tabs />
          <div className={styles.truncate}>
  This is a long text that should be truncated after a certain number of lines. 
  The user will not see the full content unless expanded.
</div>

        </main>
        <aside className={styles.rightSidebar}>Right Sidebar</aside>
      </div>
      <footer className={styles.footer}>Footer</footer>
    </div>
  );
};

export default HolyGrailLayout;

const Tabs = () => {
  const [selectedTab, setSelectedTab] = useState();

  const tabDetail = [
    { id: 1, value: "Tab 1", content: "I am Tab 1. I have one thing to render" },
    { id: 2, value: "Tab 2", content: "I am Tab 2. I have two things to render" },
    { id: 3, value: "Tab 3", content: "I am Tab 3. I have 3 things to render" },
  ];

  const handleSelection = (id) => {
    const findTab = tabDetail.find((tab) => tab.id === id);
    setSelectedTab(findTab);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "70%",
        alignItems: "flex-start", // Align content to the left
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "flex-start", // Align tabs to the left
          gap: "10px", // Adds spacing between tabs
        }}
      >
        {tabDetail.map((tab) => (
          <div
            key={tab.id}
            onClick={() => handleSelection(tab.id)}
            style={{
              minWidth: "80px",
              height: "30px",
              padding: "5px",
              textAlign: "center",
              border: "1px solid black",
              borderRadius: "5px",
              cursor: "pointer",
              backgroundColor: selectedTab?.id === tab.id ? "#ccc" : "white", // Highlight selected tab
            }}
          >
            {tab.value}
          </div>
        ))}
      </div>

      <div style={{ marginTop: "10px", padding: "10px", border: "1px solid gray" }}>
        {selectedTab?.content || "Select a tab"}
      </div>
    </div>
  );
};

const Modal = () => {
  const [modal, setModal] = useState(false);

  const handleModalClick = () => {
    setModal(true);
  };

  return (
    <div>
      <button onClick={handleModalClick}>Click me to see a Modal!</button>

      {modal &&
        createPortal(
          <div style={{
            width: "250px",
            height: "150px",
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            background: "peachpuff",
            border: "1px solid black",
            padding: "20px",
            zIndex: 1000,
          }}>
            <p>I am a Modal</p>
            <button style={{cursor: 'pointer',minWidth: "80px",
              height: "30px",
              padding: "5px",
              marginTop: "30px",
              textAlign: "center",
              border: "1px solid black",
              backgroundColor: 'pink',
              borderRadius: "5px", }} onClick={() => setModal(false)}>Close</button>
          </div>,
          document.body
        )}
    </div>
  );
};