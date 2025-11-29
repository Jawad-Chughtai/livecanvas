import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { ActivatedRoute } from '@angular/router';
import { Project } from '../../models/project.model';
import { ProjectService } from '../../services/project.service';
import { MonacoEditorModule } from 'ngx-monaco-editor-v2';
import { DomSanitizer } from '@angular/platform-browser';
import { NavbarActionsService } from '../../shared/layout/navbar/navbar-actions.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { EDITOR_CONFIGS } from './editor.constants';
import { StateService } from '../../services/state.service';
import { State } from '../../models/state.model';

@Component({
  selector: 'app-editor',
  imports: [SharedModule, MonacoEditorModule],
  templateUrl: './editor.component.html',
  styleUrl: './editor.component.scss'
})
export class EditorComponent implements OnInit, OnDestroy {
  project = {} as Project;

  previewUrl = '';

  private saveTimer?: any;

  private sanitizer = inject(DomSanitizer);

  EDITOR_CONFIGS = EDITOR_CONFIGS;

  state = {} as State;

  id: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private projectService: ProjectService,
    private actions: NavbarActionsService,
    private stateService: StateService
  ) {
    this.state = this.stateService.get();

    this.actions.state$
      .pipe(takeUntilDestroyed())
      .subscribe((state: State) => {
        const oldState = this.state;
        this.state = state;
        if (oldState.autoRun !== state.autoRun && state.autoRun) {
          this.runCode();
        }
        if (oldState.autoSave !== state.autoSave && state.autoSave) {
          this.saveCode();
        }
      });

    this.actions.save$
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.saveCode());

    this.actions.run$
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.runCode());
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.project = this.projectService.get(id) || this.projectService.create();
    if (!id) {
      window.history.replaceState({}, '', `/editor/${this.project.id}`);
    }
    this.updatePreview();
  }

  saveCode(): void {
    this.saveProject();
  }

  runCode(): void {
    this.updatePreview();
  }

  ngOnDestroy(): void {
    if (this.saveTimer) clearTimeout(this.saveTimer);
  }

  updatePreview(): void {
    const content = this.projectService.getContent(this.project);
    const blob = new Blob([content], { type: 'text/html' });
    this.previewUrl = this.sanitizer.bypassSecurityTrustResourceUrl(URL.createObjectURL(blob)) as string;
  }

  onCodeChange(): void {
    if (this.state.autoSave) {
      if (this.saveTimer) clearTimeout(this.saveTimer);
      this.saveTimer = setTimeout(() => this.saveProject(), 800);
    }
    if (this.state.autoRun) {
      this.updatePreview();
    }
  }

  private saveProject(): void {
    if (!this.project) return;
    this.projectService.update(this.project);
  }
}