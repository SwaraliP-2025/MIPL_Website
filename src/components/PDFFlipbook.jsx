import { useState, useRef } from "react";
import HTMLFlipBook from "react-pageflip";
import { Document, Page, pdfjs } from "react-pdf";
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

// Set up PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

const PDFFlipbook = ({ pdfUrl, isFullscreen }) => {
  const [numPages, setNumPages] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [error, setError] = useState(null);
  const flipBookRef = useRef(null);

  const onDocumentLoadSuccess = ({ numPages }) => {
    console.log('PDF loaded successfully. Pages:', numPages);
    setNumPages(numPages);
    setLoading(false);
    setError(null);
  };

  const onDocumentLoadError = (error) => {
    console.error('Error loading PDF:', error);
    setError('Failed to load PDF. Please check the file.');
    setLoading(false);
  };

  const onLoadProgress = ({ loaded, total }) => {
    const progress = Math.round((loaded / total) * 100);
    setLoadingProgress(progress);
  };

  const goToNextPage = () => {
    if (flipBookRef.current) {
      flipBookRef.current.pageFlip().flipNext();
    }
  };

  const goToPrevPage = () => {
    if (flipBookRef.current) {
      flipBookRef.current.pageFlip().flipPrev();
    }
  };

  const onFlip = (e) => {
    setCurrentPage(e.data);
  };

  // Calculate dimensions based on screen size
  const getPageDimensions = () => {
    if (isFullscreen) {
      return {
        width: Math.min(window.innerWidth * 0.4, 500),
        height: Math.min(window.innerHeight * 0.75, 700)
      };
    }
    return {
      width: Math.min(window.innerWidth * 0.3, 400),
      height: Math.min(window.innerHeight * 0.55, 600)
    };
  };

  const dimensions = getPageDimensions();

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-full gap-4">
        <Loader2 className="w-12 h-12 animate-spin text-primary" />
        <p className="text-lg font-medium">Loading Coffee Table Book...</p>
        <div className="w-64 h-2 bg-muted rounded-full overflow-hidden">
          <div 
            className="h-full bg-primary transition-all duration-300"
            style={{ width: `${loadingProgress}%` }}
          />
        </div>
        <p className="text-sm text-muted-foreground">{loadingProgress}%</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-full gap-4">
        <p className="text-red-500">{error}</p>
        <p className="text-sm text-muted-foreground">PDF URL: {pdfUrl}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center h-full gap-6 py-8">
      {/* Flipbook Container */}
      <div className="relative">
        <Document
          file={pdfUrl}
          onLoadSuccess={onDocumentLoadSuccess}
          onLoadError={onDocumentLoadError}
          onLoadProgress={onLoadProgress}
          options={{
            cMapUrl: 'https://unpkg.com/pdfjs-dist@3.11.174/cmaps/',
            cMapPacked: true,
            standardFontDataUrl: 'https://unpkg.com/pdfjs-dist@3.11.174/standard_fonts/',
          }}
          loading={
            <div className="flex items-center justify-center p-8">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          }
          error={
            <div className="flex items-center justify-center p-8">
              <p className="text-red-500">Error loading PDF</p>
            </div>
          }
        >
          {numPages && (
            <HTMLFlipBook
              ref={flipBookRef}
              width={dimensions.width}
              height={dimensions.height}
              size="stretch"
              minWidth={250}
              maxWidth={700}
              minHeight={350}
              maxHeight={900}
              drawShadow={true}
              flippingTime={600}
              usePortrait={false}
              startZIndex={0}
              autoSize={true}
              maxShadowOpacity={0.4}
              showCover={true}
              mobileScrollSupport={true}
              onFlip={onFlip}
              className="flipbook-shadow"
              style={{ margin: "0 auto" }}
            >
              {Array.from(new Array(numPages), (el, index) => (
                <div key={`page_${index + 1}`} className="page bg-white flex items-center justify-center">
                  <Page
                    pageNumber={index + 1}
                    width={dimensions.width}
                    renderTextLayer={false}
                    renderAnnotationLayer={false}
                    loading={
                      <div className="flex items-center justify-center h-full">
                        <Loader2 className="w-4 h-4 animate-spin text-muted-foreground" />
                      </div>
                    }
                  />
                </div>
              ))}
            </HTMLFlipBook>
          )}
        </Document>
      </div>

      {/* Navigation Controls */}
      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          size="lg"
          onClick={goToPrevPage}
          disabled={currentPage === 0}
          className="gap-2"
        >
          <ChevronLeft className="w-5 h-5" />
          <span className="hidden sm:inline">Previous</span>
        </Button>

        <div className="px-6 py-2 glass-card rounded-lg">
          <span className="text-sm font-medium">
            {currentPage + 1} / {numPages}
          </span>
        </div>

        <Button
          variant="outline"
          size="lg"
          onClick={goToNextPage}
          disabled={currentPage >= numPages - 1}
          className="gap-2"
        >
          <span className="hidden sm:inline">Next</span>
          <ChevronRight className="w-5 h-5" />
        </Button>
      </div>

      {/* Instructions */}
      <div className="text-center text-sm text-muted-foreground max-w-md">
        <p>Click on the page corners or edges to flip • Drag pages to turn them</p>
      </div>
    </div>
  );
};

export default PDFFlipbook;
