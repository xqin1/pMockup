import { NgModule } from '@angular/core';
import {
  MatButtonModule,
  MatToolbarModule,
  MatInputModule,
  MatProgressSpinnerModule,
  MatSnackBarModule,
  MatChipsModule,
  MatSelectModule,
  MatCheckboxModule,
  MatCardModule,
  MatListModule,
  MatIconModule,
  MatTooltipModule,
  MatAutocompleteModule,
  MatFormFieldModule,
  MatExpansionModule,
  MatRadioModule,
  MatStepperModule,
  MatDialogModule
} from '@angular/material';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';

@NgModule({
  imports: [
    MatButtonModule,
    MatToolbarModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatChipsModule,
    MatSelectModule,
    MatCheckboxModule,
    MatCardModule,
    MatListModule,
    MatIconModule,
    MatTooltipModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatExpansionModule,
    MatRadioModule,
    MatStepperModule,
    MatDialogModule,
    ReactiveFormsModule,
    FormsModule
],
  exports: [
    MatButtonModule,
    MatToolbarModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatChipsModule,
    MatSelectModule,
    MatCheckboxModule,
    MatCardModule,
    MatListModule,
    MatIconModule,
    MatTooltipModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatExpansionModule,
    MatRadioModule,
    MatStepperModule,
    MatDialogModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class MaterialModule { }
