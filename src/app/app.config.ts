import {
  provideHttpClient,
  withFetch,
  withInterceptors,
} from '@angular/common/http';
import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection
} from '@angular/core';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { withInMemoryScrolling } from '@angular/router';
import { provideFileRouter, requestContextInterceptor } from '@analogjs/router';
import { provideContent, withMarkdownRenderer } from '@analogjs/content';
import { withShikiHighlighter } from '@analogjs/content/shiki-highlighter';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideFileRouter(
      withInMemoryScrolling({
        scrollPositionRestoration: 'enabled',
        anchorScrolling: 'enabled',
      })
    ),
    provideHttpClient(
      withFetch(),
      withInterceptors([requestContextInterceptor])
    ),
    provideClientHydration(withEventReplay()),
    provideContent(withMarkdownRenderer(), withShikiHighlighter()),
  ],
};
