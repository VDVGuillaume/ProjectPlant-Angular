import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { FlexLayoutModule } from '@angular/flex-layout';
import {MatTableModule} from '@angular/material/table';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { MatToolbar, MatToolbarModule } from '@angular/material/toolbar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { LayoutModule } from '@angular/cdk/layout';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatCheckboxModule } from '@angular/material/checkbox';

@NgModule({
	declarations: [],
	imports: [
		CommonModule,
		FlexLayoutModule,
		MatListModule,
		MatCardModule,
		MatIconModule,
		MatTableModule,
		MatFormFieldModule,
		MatInputModule,
		MatToolbarModule,
		MatProgressSpinnerModule,
   		MatOptionModule,
    	MatSelectModule,
    	MatButtonModule,
    	MatSidenavModule,
    	MatIconModule,
    	MatListModule,
    	LayoutModule,
		MatPaginatorModule,
		MatSortModule,
		MatCheckboxModule,		
	],
	exports: [

		FlexLayoutModule,
		MatListModule,
		MatCardModule,
		MatIconModule,
		MatTableModule,
		MatFormFieldModule,
		MatInputModule,
		MatToolbarModule,
		MatProgressSpinnerModule,
    	MatOptionModule,
    	MatSelectModule,
    	MatToolbarModule,
    	MatButtonModule,
    	MatSidenavModule,
    	MatIconModule,
    	MatListModule,
    	LayoutModule,
		MatPaginatorModule,
		MatSortModule,
		MatCheckboxModule
		
	]
})
export class MaterialModule {}
