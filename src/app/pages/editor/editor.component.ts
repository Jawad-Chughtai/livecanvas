import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { ActivatedRoute } from '@angular/router';
import { Project } from '../../models/project.model';
import { ProjectService } from '../../services/project.service';
import { MonacoEditorModule, provideMonacoEditor } from 'ngx-monaco-editor-v2';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-editor',
  imports: [SharedModule, MonacoEditorModule],
  templateUrl: './editor.component.html',
  styleUrl: './editor.component.scss'
})
export class EditorComponent implements OnInit, OnDestroy {
  project?: Project;
  html = '';
  css = '';
  js = '';

  previewUrl = '';
  private saveTimer?: any;

  private sanitizer = inject(DomSanitizer);

  constructor(private route: ActivatedRoute, private projectService: ProjectService) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) return;
    const p = this.projectService.get(id);
    if (!p) return;

    this.project = p;
    this.html = p.html;
    this.css = p.css;
    this.js = p.js;

    this.updatePreview();
  }

  ngOnDestroy(): void {
    if (this.saveTimer) clearTimeout(this.saveTimer);
  }

  updatePreview(): void {
    const content = `
      <html>
        <head>
          <style>${this.css}</style>
        </head>
        <body>
          ${this.html}
          <script>${this.js}<\/script>
        </body>
      </html>
    `;
    const blob = new Blob([content], { type: 'text/html' });
    this.previewUrl = this.sanitizer.bypassSecurityTrustResourceUrl(URL.createObjectURL(blob)) as string;
  }

  onCodeChange(): void {
    if (this.saveTimer) clearTimeout(this.saveTimer);
    this.saveTimer = setTimeout(() => this.saveProject(), 800);
    this.updatePreview();
  }

  private saveProject(): void {
    if (!this.project) return;
    this.project.html = this.html;
    this.project.css = this.css;
    this.project.js = this.js;
    this.projectService.update(this.project);
  }

  editorOptions = {
    // theme: 'vs-dark',
    language: 'html'
  };

  htmlOptions = { ... this.editorOptions, language: 'html' };
  cssOptions = { ... this.editorOptions, language: 'css' };
  jsOptions = { ... this.editorOptions, language: 'javascript' };
}