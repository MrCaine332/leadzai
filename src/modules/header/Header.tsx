import styles from "./Header.module.css"
import { Container } from "@/components/ui/container/Container"

export const Header = () => {
  return (
    <header className={styles.header}>
      <Container className={styles.headerContainer}>Weather App</Container>
    </header>
  )
}
