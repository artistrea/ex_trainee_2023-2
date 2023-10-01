import React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import styles from "@/styles/Dialog.module.css";
import { CategoryForm, CategoryFormProps } from "./Form";
import { XIcon } from "lucide-react";

const CategoryDialog: React.FC<
  React.PropsWithChildren<
    CategoryFormProps & {
      onDelete: () => void;
      title: string;
      description: string;
    }
  >
> = ({ children, title, description, onDelete, ...formProps }) => (
  <Dialog.Root>
    <Dialog.Trigger asChild>{children}</Dialog.Trigger>
    <Dialog.Portal>
      <Dialog.Overlay className={styles["DialogOverlay"]} />
      <Dialog.Content className={styles["DialogContent"]}>
        <Dialog.Title className={styles["DialogTitle"]}>{title}</Dialog.Title>
        <Dialog.Description className={styles["DialogDescription"]}>
          {description}
        </Dialog.Description>
        <CategoryForm {...formProps} />
        <Dialog.Close asChild>
          <button className={styles.exitButton} aria-label="Close">
            <XIcon />
          </button>
        </Dialog.Close>
        <Dialog.Close asChild>
          <button
            onClick={onDelete}
            className={`btn btn-danger ${styles.fullWidth}`}
            style={{ marginTop: "1rem" }}
            aria-label="Close"
          >
            Deletar
          </button>
        </Dialog.Close>
      </Dialog.Content>
    </Dialog.Portal>
  </Dialog.Root>
);

export default CategoryDialog;
