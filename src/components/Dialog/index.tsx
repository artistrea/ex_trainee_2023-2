import React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { CrossIcon } from "lucide-react";
import styles from "./style.module.css";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  weight: ["400", "700"],
  subsets: ["latin"],
});

const DialogDemo = () => (
  <Dialog.Root>
    <Dialog.Trigger asChild>
      <button className={styles["Button"] + " " + styles["violet"]}>
        Edit profile
      </button>
    </Dialog.Trigger>
    <Dialog.Portal>
      <Dialog.Overlay className={styles["DialogOverlay"]} />
      <Dialog.Content className={styles["DialogContent"]}>
        <Dialog.Title className={styles["DialogTitle"]}>
          Edit profile
        </Dialog.Title>
        <Dialog.Description className={styles["DialogDescription"]}>
          Make changes to your profile here. Click save when you're done.
        </Dialog.Description>
        <fieldset className={styles["Fieldset"]}>
          <label className={styles["Label"]} htmlFor="name">
            Name
          </label>
          <input
            className={styles["Input"]}
            id="name"
            defaultValue="Pedro Duarte"
          />
        </fieldset>
        <fieldset className={styles["Fieldset"]}>
          <label className={styles["Label"]} htmlFor="username">
            Username
          </label>
          <input
            className={styles["Input"]}
            id="username"
            defaultValue="@peduarte"
          />
        </fieldset>
        <div
          style={{ display: "flex", marginTop: 25, justifyContent: "flex-end" }}
        >
          <Dialog.Close asChild>
            <button className={styles["Button"] + " " + styles["green"]}>
              Save changes
            </button>
          </Dialog.Close>
        </div>
        <Dialog.Close asChild>
          <button className={styles["IconButton"]} aria-label="Close">
            <CrossIcon />
          </button>
        </Dialog.Close>
      </Dialog.Content>
    </Dialog.Portal>
  </Dialog.Root>
);

export default DialogDemo;
