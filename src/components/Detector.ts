import { BarcodeDetectorPolyfill, DetectedBarcode } from '@undecaf/barcode-detector-polyfill'

export async function createDetector(): Promise<BarcodeDetectorPolyfill> {
	const formats = await BarcodeDetectorPolyfill.getSupportedFormats()
	return new BarcodeDetectorPolyfill({formats})
}


export async function extractISBNs(source: ImageBitmapSource, detector: BarcodeDetectorPolyfill): Promise<string[]> {
	const barcodes: DetectedBarcode[] = await detector.detect(source)
	const isbnsBarcodes = barcodes.filter((item) => ["isbn_13","isbn_10", "isbn_13+2","isbn_13+5"].includes(item.format))
	return isbnsBarcodes.map((item) => {
		return item.rawValue
	})

}

