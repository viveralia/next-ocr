import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
  }
})

export default function PdfPage() {
  return (
    <Document>
      <Page size="A4" style={styles.container}>
        <View>
          <Text>Hello world</Text>
        </View>
      </Page>
    </Document>
  )
}